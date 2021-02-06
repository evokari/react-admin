/* eslint-disable camelcase */
import axios from "axios";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/Role";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const UserCreate = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get("roles");
        setRoles(data);
      }
    )();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("users", {
      first_name,
      last_name,
      email,
      role_id,
    });
    setRedirect(true);
  };

  if (redirect) {
    return (
          <Redirect to="/users"/>
    );
  }
  return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>First name</label>
                    <input className="form-control" placeholder="First name" required
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input className="form-control" placeholder="Last name" required
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" placeholder="Email" required
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control"
                        onChange={e => setRoleId(e.target.value)}
                    >{roles.map((role: Role) => {
                      return (
                            <option key={role.id} value={role.id}>{role.name}</option>
                      );
                    })}</select>
                </div>
                <button className="btn btn-outline-secondary" type="submit">Submit</button>
            </form>
        </Wrapper>
  );
};
export default UserCreate;
