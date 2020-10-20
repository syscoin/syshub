import React from "react";
import { useUser } from '../../context/user-context';


export default function UserInfo() {
  const {  user  } = useUser();

  return (
    <>
      <p>{user.data.name}</p>
      <form className="input-form">
        
      </form>
    </>
  );
}
