import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user-context";


export default function HomeButtons() {
  const { user } = useUser();

  return (
    <div className="article__actions vertical">
      <Link to="/about" className="btn btn--blue-border">
        Learn More
      </Link>
      <Link to="/setup" className="btn btn--blue-border">
        Setup Masternode
      </Link>
      {!user && (<Link to="/signup" className="btn btn--blue-border">
        Sign up
      </Link>)}
    </div>
  );
}
