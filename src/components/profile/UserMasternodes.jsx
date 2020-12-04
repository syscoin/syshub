import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';
import swal from 'sweetalert2';


import { useUser } from '../../context/user-context';
import { getUserMasterNodes, updateMasterNode, destroyMasterNode, get2faInfoUser } from '../../utils/request';

import SubTitle from "../global/SubTitle";
import UserMN from './UserMN';
import CustomModal from "../global/CustomModal";
import Modal2FA from "./2FA/Modal2FA";

/**
 * Component to show the user masternodes at profile
 * @component
 * @subcategory Profile
 * @example
 * return (
 *  <UserMasternodes />
 * )
 */
function UserMasternodes() {
  const { user } = useUser();
  const { url } = useRouteMatch();
  const [masternodes, setMasternodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [masternodeToDelete, setMasternodeToDelete] = useState('');
  const [userSignInGAuth, setUserSignInGAuth] = useState(null);
  const [user2FA, setUser2FA] = useState(null);
  const [open2FAModal, setOpen2FAModal] = useState(false);
  const cancelSource = useMemo(() => axios.CancelToken.source(), []);
  const isMounted = useRef(false);
  
  /**
   * function that loads the user masternodes from the API
   * @function
   */
  const loadMasternodes = useCallback(async () => {
    try {
      setIsFetching(true);
      const {data, status} = await getUserMasterNodes({cancelToken: cancelSource.token});
      if (data && status === 200) {
        if (isMounted.current) {
          setMasternodes(data.nodes);
          setIsFetching(false);
        }
      }
      else if (status === 204) {
        if (isMounted.current) {
          setMasternodes([]);
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
   * useEffect that loads the masternodes at mounting and cancel the request at unmounting
   * @function
   */
  useEffect(() => {
    isMounted.current = true;
    loadMasternodes();
    return () => {
      isMounted.current = false;
      cancelSource.cancel('The request has been canceled');
    }
  }, [loadMasternodes, cancelSource]);

  /**
   * function that edits the user masternodes and updates it in the api
   * @function
   * @param {string} uid uid of the masternode to edit
   * @param {Object} data from the edit mn input
   */
  const editMN = async (uid, data) => {
    try {
      const response = await updateMasterNode( uid, {data: data});
      if (response.data) {
        swal.fire({
          icon: "success",
          title: "The masternode has been updated",
          timer: 2000,
          showConfirmButton: false
        });
        loadMasternodes();
      }  
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "The masternode couldn't update, please try again",
        text: error.message
      });
      // console.log(error);
    }
  }

  /**
   * function that checks if there is 2fa to remove an masternode and proceeds to open the 2fa modal
   * @function
   * @param {string} uid uid of the masternode to remove
   */
  const removeMN = async (uid) => {
    const result = await swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
      await setMasternodeToDelete(uid);
      try {
        let user2fa = await get2faInfoUser(user.data.user_id);
        if (user2fa.twoFa === true) {
          setUser2FA(user2fa);
          if (user2fa.gAuth === true) {
            setUserSignInGAuth({secret: user2fa.gAuthSecret});
          }
          setOpen2FAModal(true);
        }
        else {
          deleteMasternodeAfterVerification(uid);
        }
      }
      catch (error) {
        swal.fire({
          icon: 'error',
          title: 'There was an error',
          text: error.message,
        });
      }
    }
  }

  /**
   * function to remove the masternode from the user masternodes list
   * @function
   * @param {string} [uid] uid of the masternode to remove (optional)
   */
  const deleteMasternodeAfterVerification = async (uid = null) => {
    setOpen2FAModal(false);
    swal.fire({
      title: 'Deleting masternode',
      showConfirmButton: false,
      willOpen: () => {
        swal.showLoading()
      }
    });
    const masternodeToRemove = uid || masternodeToDelete;
    try {
      await destroyMasterNode(masternodeToRemove).catch(err => {
        throw err
      });
      
      swal.fire({
        icon: "success",
        title: "The masternode has been deleted",
        timer: 2000,
        showConfirmButton: false
      });
      loadMasternodes();
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
      <SubTitle heading="My Masternodes" />
      {
        (masternodes.length > 0 && !isFetching) && masternodes.map((mnode, index) => (
          <UserMN onEdit={editMN} onRemove={removeMN} masternode={mnode} key={mnode.uid} index={index} />
        ))
      }
      {
        (masternodes.length === 0 && !isFetching) && (
          <p className="indicator">You don't have a masternode, please add one.</p>
        )
      }
      {
        isFetching && (
          <p className="indicator">Loading masternodes...</p>
        )
      }
      <Link to={`${url}/add-masternodes`} className="btn btn--blue-border">
        Add masternodes
      </Link>
      <CustomModal
        open={open2FAModal}
        onClose={() => setOpen2FAModal(false)}
      >
        {user2FA && <Modal2FA
          user2fa={user2FA}
          userSignInGAuth={userSignInGAuth}
          onGAuth={deleteMasternodeAfterVerification}
          onPhoneSMS={deleteMasternodeAfterVerification}
        />}
      </CustomModal>
    </>
  )
}


export default UserMasternodes;
