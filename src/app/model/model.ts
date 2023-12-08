export class User {
  id: number;
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
    this.id = userId;
    this.name = name;
    this.surname = surname;
    this.hashedPassword = hashedPassword;
    this.email = email;
    this.permissions = permissions;
  }
}