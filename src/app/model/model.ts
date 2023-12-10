export class User {
  name: string;
  surname: string;
  hashedPassword: string;
  email: string;
  permissions: number;

  constructor(
    name: string,
    surname: string,
    hashedPassword: string,
    email: string,
    permissions: number
  ) {
    this.name = name;
    this.surname = surname;
    this.hashedPassword = hashedPassword;
    this.email = email;
    this.permissions = permissions;
  }
}

export const UserPermission = {
  CAN_CREATE_USERS: 1,
  CAN_READ_USERS: 2,
  CAN_UPDATE_USERS: 4,
  CAN_DELETE_USERS: 8,
};