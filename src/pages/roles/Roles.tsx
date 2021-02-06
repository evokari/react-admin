import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Role } from "../../models/Role";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get("/roles");
        setRoles(data);
      }
    )();
  }, []);

  const del = async (id: number) => {
    if (window.confirm("Sure?")) {
      await axios.delete(`roles/${id}`);
      setRoles(
        roles.filter((role: Role) => {
          return role.id !== id;
        }),
      );
    }
  };
  return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/roles/create" className="btn btn-sm btn-outline-secondary">Add</Link>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                          roles.map((role: Role) => {
                            return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                                  <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                  <div className="btn-group mr-2">
                                    <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(role.id)}>Delete</a>
                                  </div>
                                </td>
                            </tr>
                            );
                          })
                      }
                  </tbody>
                </table>
              </div>
        </Wrapper>
  );
};
export default Roles;
