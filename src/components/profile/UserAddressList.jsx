import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert2';
import { useTranslation } from 'react-i18next/';

// import { useUser } from '../../context/user-context';
import { getUserVotingAddress, updateVotingAddress, destroyVotingAddress } from '../../utils/request';

import SubTitle from "../global/SubTitle";
import UserAddress from './UserAddress';
// import CustomModal from "../global/CustomModal";
// import Modal2FA from "./2FA/Modal2FA";

/**
 * Component to show the user address at profile
 * @component
 * @subcategory Profile
 * @example
 * return (
 *  <UserAddressList />
 * )
 */
function UserAddressList() {
  // const { user } = useUser();
  const { url } = useRouteMatch();
  const [votingAddress, setVotingAddress] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [voteAddressToDelete, setVoteAddressToDelete] = useState('');
  // const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  // const [user2FA, setUser2FA] = useState(null);
  // const [open2FAModal, setOpen2FAModal] = useState(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);
  const isMounted = useRef(false);
  const { t } = useTranslation();
  
  /**
   * function that loads the user voting address from the API
   * @function
   */
  const loadVotingAddress = useCallback(async () => {
    try {
      setIsFetching(true);
      const {data, status} = await getUserVotingAddress({cancelToken: cancelSource.token});
      if (data && status === 200) {
        if (isMounted.current) {
          setVotingAddress(data.nodes);
          setIsFetching(false);
        }
      }
      else if (status === 204) {
        if (isMounted.current) {
          setVotingAddress([]);
          setIsFetching(false);
        }
      }
      else {
        if (isMounted.current) {
          setIsFetching(false);
        }
      }
    }
    catch (error) {
      if (isMounted.current) setIsFetching(false);
    }
  }, [cancelSource]);
  
  /**
   * useEffect that loads the voting address at mounting and cancel the request at unmounting
   * @function
   */
  useEffect(() => {
    isMounted.current = true;
    loadVotingAddress();
    return () => {
      isMounted.current = false;
      cancelSource.cancel('The request has been canceled');
    }
  }, [loadVotingAddress, cancelSource]);

  /**
   * function that edits the user voting address and updates it in the api
   * @function
   * @param {string} uid uid of the v.a. to edit
   * @param {Object} data from the edit va input
   */
  const editVotingAddress = async (uid, data) => {
    swal.fire({
      title: 'Editting the voting address, please wait',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    try {
      const response = await updateVotingAddress( uid, data);
      if (response.data) {
        swal.fire({
          icon: "success",
          title: "The voting address has been updated",
          timer: 2000,
          showConfirmButton: false
        });
        loadVotingAddress();
      }  
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "The voting address couldn't update, please try again",
        // text: error.message
      });
      loadVotingAddress();
    }
  }

  /**
   * function that checks if there is 2fa to remove an voting address and proceeds to open the 2fa modal
   * @function
   * @param {string} uid uid of the v.a. to remove
   */
  const removeVotingAddress = async (uid) => {
    const result = await swal.fire({
      icon: 'warning',
      title: 'Are you sure to delete this address?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
      await setVoteAddressToDelete(uid);
      // try {
      //   let user2fa = await get2faInfoUser(user.data.user_id);
      //   if (user2fa.twoFa === true) {
      //     setUser2FA(user2fa);
      //     if (user2fa.gAuth === true) {
      //       setUserSignInGAuth({secret: user2fa.gAuthSecret});
      //     }
      //     setOpen2FAModal(true);
      //   }
      //   else {
      //     deleteVotingAddressAfterVerification(uid);
      //   }
      // }
      // catch (error) {
      //   swal.fire({
      //     icon: 'error',
      //     title: 'There was an error',
      //     text: error.message,
      //   });
      // }
      deleteVotingAddressAfterVerification(uid);
    }

  }

  /**
   * function to remove the voting address after verification
   * @function
   * @param {string} [uid] uid of the v.a. to remove (optional)
   */
  const deleteVotingAddressAfterVerification = async (uid = null) => {
    // setOpen2FAModal(false);
    swal.fire({
      title: 'Deleting voting address',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    const addressToRemove = uid || voteAddressToDelete;
    try {
      await destroyVotingAddress(addressToRemove).catch(err => {
        throw err
      });
      
      swal.fire({
        icon: "success",
        title: "The voting address has been deleted",
        timer: 2000,
        showConfirmButton: false
      });
      loadVotingAddress();
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "There was an error",
        text: error.message
      });
    }
  }

  return (
    <>
      <SubTitle heading={t('profile.data.address.heading')} />
      {
        (votingAddress.length > 0 && !isFetching) && votingAddress.map((voteAddress, index) => (
          <UserAddress onEdit={editVotingAddress} onRemove={removeVotingAddress} address={voteAddress} key={voteAddress.uid} index={index} />
        ))
      }
      {
        (votingAddress.length === 0 && !isFetching) && (
          <p className="indicator">{t('profile.data.address.noAddress')}</p>
        )
      }
      {
        isFetching && (
          <p className="indicator">{t('profile.data.address.loading')}</p>
        )
      }
      <Link to={`${url}/add-voting-address`} className="btn btn--blue-border">
        Add voting address
      </Link>
      {/* <CustomModal
        open={open2FAModal}
        onClose={() => setOpen2FAModal(false)}
      >
        {user2FA && <Modal2FA
          user2fa={user2FA}
          userSignInGAuth={userSignInGAuth}
          onGAuth={deleteVotingAddressAfterVerification}
          onPhoneSMS={deleteVotingAddressAfterVerification}
        />}
      </CustomModal> */}
    </>
  )
}


export default UserAddressList;
