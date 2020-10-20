import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../context/user-context';

import SubTitle from "./SubTitle";
import UserMN from './UserMN';

const data = {
  "ok": true,
  "nodes": [
      {
          "uid": "4SC4sUDP1RCJxohvLv37",
          "name": "198.211.117.144",
          "txId": "76ab7ed486e32f2200e9479940577117987b1ea5e11682e7dbbc16dceffb6f0f",
          "privateKey": "5Jz5HbNgk2nR31QszYVEAsfV5WNN91NQzSgo2gpkiNRjrviayrc"
      },
      {
          "uid": "TjOZr5UU0uQcwIUPlTyO",
          "name": "198.211.117.144",
          "txId": "76ab7ed486e32f2200e9479940577117987b1ea5e11682e7dbbc16dceffb6f0f",
          "privateKey": "5Jz5HbNgk2nR31QszYVEAsfV5WNN91NQzSgo2gpkiNRjrviayrc"
      },
      {
          "uid": "i0RtHZmF8xGWmV1V8KBa",
          "name": "198.211.117.144",
          "txId": "76ab7ed486e32f2200e9479940577117987b1ea5e11682e7dbbc16dceffb6f0f",
          "privateKey": "5Jz5HbNgk2nR31QszYVEAsfV5WNN91NQzSgo2gpkiNRjrviayrc"
      },
      {
          "uid": "0JwhQFU9zwP4C55iN0WG",
          "name": "198.211.117.144",
          "txId": "76ab7ed486e32f2200e9479940577117987b1ea5e11682e7dbbc16dceffb6f0f",
          "privateKey": "5Jz5HbNgk2nR31QszYVEAsfV5WNN91NQzSgo2gpkiNRjrviayrc"
      }
  ]
}

function UserMasternodes(props) {
  const {  user  } = useUser();
  const { nodes: masternodes } = data;

  const editMN = (uid) =>{
    console.log(uid + ' edit')
  }

  const removeMN = (uid) => {
    console.log(uid + ' remove')
    // const mnToRemove = masternodes.find(mn => mn.uid === uid);
    // console.log(mnToRemove);
  }

  return (
    <>
      <SubTitle heading="My Masternodes" />
      {
        masternodes.map((mnode, index) => (
          <UserMN onEdit={editMN} onRemove={removeMN} masternode={mnode} key={mnode.uid} index={index} />
        ))
      }
      <Link to="/add-masternodes" className="btn btn--blue-border">
        Add masternodes
      </Link>
    </>
  )
}


export default UserMasternodes;
