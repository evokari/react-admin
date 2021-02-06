import axios from "axios";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../models/User";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Nav = (props: { user: User }) => {
  const [user, setUser] = useState(new User());

  const logout = async () => {
    await axios.post("logout", {});
  };

  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        Company name
      </a>
      <ul className="my-2 my-md-0 mr-md-3">
        <Link
          to="/profile"
          className="p-2 text-white text-decoration-none"
          href="#"
        >
          {props.user.name}
        </Link>
        <Link
          to="/login"
          className="p-2 text-white text-decoration-none"
          href="#"
          onClick={logout}
        >
          Sign out
        </Link>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Nav);
