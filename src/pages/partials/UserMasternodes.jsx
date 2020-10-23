import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useUser } from '../../context/user-context';
import { getUserMasterNodes, updateMasterNode, destroyMasterNode } from '../../utils/request';

import SubTitle from "./SubTitle";
import UserMN from './UserMN';


function UserMasternodes(props) {
  const { user } = useUser();
  const { url } = useRouteMatch();
  const [masternodes, setMasternodes] = useState([]);
  const [isFetching, setIsFetching] = useState(false)

  const loadMasternodes = async () => {
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
  }
  useEffect(() => {
    

    // loadMasternodes();

  }, [loadMasternodes]);

  
  const editMN = (uid, data) => {

    console.log(uid + ' edit')
    console.log(data);
  }

  const removeMN = (uid) => {
    console.log(uid + ' remove')
    Swal(

    )
    // const mnToRemove = masternodes.find(mn => mn.uid === uid);
    // console.log(mnToRemove);
  }

  return (
    <>
      <SubTitle heading="My Masternodes" />
      {
        masternodes.length > 0 && masternodes.map((mnode, index) => (
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
