export class User {
  userId: number;
  name: string;
  surname: string;
  hashedPassword: string;
  email: string;
  permissions: number;

  constructor(
    userId: number,
    name: string,
    surname: string,
    hashedPassword: string,
    email: string,
    permissions: number
  ) {
    this.userId = userId;
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
  CAN_SEARCH_VACUUM: 16,
  CAN_START_VACUUM: 32,
  CAN_STOP_VACUUM: 64,
  CAN_DISCHARGE_VACUUM: 128,
  CAN_ADD_VACUUM: 256,
  CAN_REMOVE_VACUUMS: 512
};