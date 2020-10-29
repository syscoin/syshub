import React, { useEffect, useState, useCallback } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';


import { useUser } from '../../context/user-context';
import { getUserMasterNodes, updateMasterNode, destroyMasterNode } from '../../utils/request';

import SubTitle from "../global/SubTitle";
import UserMN from './UserMN';


function UserMasternodes(props) {
  const { user } = useUser();
  const { url } = useRouteMatch();
  const [masternodes, setMasternodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false)

  const loadMasternodes = useCallback(async () => {
    try {
      setIsFetching(true);
      const response = await getUserMasterNodes(user.token);
      
      if (response.data) {
        setMasternodes(response.data.nodes);
      }  
      setIsFetching(false);
    }
    catch (error) {
      console.log(error)
      setIsFetching(false);
    }
  }, [user]);
  
  useEffect(() => {
    loadMasternodes();
  }, [loadMasternodes]);

  
  const editMN = async (uid, data) => {

    try {
      const response = await updateMasterNode(user.token, uid, {data: data});
      if (response.data) {
        loadMasternodes();
      }  
    } catch (error) {
      console.log(error);
    }

  }

  const removeMN = async (uid) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
      try {
        await destroyMasterNode(user.token, uid);
        Swal.fire(
          'Deleted!',
          'Your masternode has been deleted.',
          'success'
        )
        loadMasternodes();
      } catch (error) {
        console.log(error);
      }

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
    </>
  )
}


export default UserMasternodes;
