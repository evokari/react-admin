import { Role } from "./Role";

export class User {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: number = 0,
    public first_name = "",
    public last_name = "",
    public email = "",
    public role = new Role(),
  ) {

  }

  get name(): string {
    return this.first_name + " " + this.last_name;
  }
}
