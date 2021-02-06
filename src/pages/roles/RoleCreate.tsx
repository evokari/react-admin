import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { Permission } from "../../models/Permission";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RoleCreate = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("permissions");
      setPermissions(data);
    })();
  }, []);

  const check = async (id: number) => {
    if (
      !selected.find((s) => {
        return s === id;
      })
    ) {
      setSelected([...selected, id]);
    } else {
      setSelected(
        selected.filter((s) => {
          return s !== id;
        }),
      );
    }
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await axios.post("roles", {
      name,
      permissions: selected,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/roles"} />;
  }
  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map((permission: Permission) => {
              return (
                <div
                  key={permission.id}
                  className="form-check form-check-inline col-3"
                >
                  <input
                    value={permission.id}
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => check(permission.id)}
                  />
                  <label className="check-label">{permission.name}</label>
                </div>
              );
            })}
          </div>
        </div>
        <button className="btn btn-outline-secondary" type="submit">
          Save
        </button>
      </form>
    </Wrapper>
  );
};
export default RoleCreate;