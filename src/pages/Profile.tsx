import axios from "axios";
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import { User } from "../models/User";
import { setUser } from "../redux/actions/setUserAction";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Profile = (props: { user: User; setUser: (user: User) => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data } = await axios.put("users/info", {
      first_name: firstName,
      last_name: lastName,
      email,
    });
    props.setUser(
      new User(data.id, data.first_name, data.last_name, data.email, data.role),
    );
  };
  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put("users/password", {
      password,
      password_confirm: passwordConfirm,
    });
  };
  return (
    <Wrapper>
      <h2>Account Information</h2>
      <form onSubmit={infoSubmit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">First name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="First name"
              required
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Last name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Last name"
              required
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Email"
              required
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-outline-secondary" type="submit">
          Save
        </button>
      </form>
      <form onSubmit={passwordSubmit}>
        <h2>Change Password</h2>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Confirm password</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Confirm"
              required
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-outline-secondary" type="submit">
          Save
        </button>
      </form>
    </Wrapper>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
