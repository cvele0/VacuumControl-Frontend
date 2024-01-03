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

export enum CleanerStatus {
  ON = 'ON',
  OFF = 'OFF',
  DISCHARGING = 'DISCHARGING'
}

export class Cleaner {
  cleanerId: number;
  name: string;
  status: CleanerStatus = CleanerStatus.OFF;
  dateCreated: string; // Use string or Date as per your requirements for handling LocalDate
  user: User | null;
  active: boolean = true;

  constructor(cleanerId: number, name: string, dateCreated: string, user: User | null) {
    this.cleanerId = cleanerId;
    this.name = name;
    this.dateCreated = dateCreated;
    this.user = user;
  }
}

export class ErrorMessage {
  errorMessageId: number;
  user: User | null;
  cleaner: Cleaner | null;
  date: Date | null;
  operation: string;
  errorMessage: string;

  constructor(
    errorMessageId: number,
    user: User | null,
    cleaner: Cleaner | null,
    date: Date | null,
    operation: string,
    errorMessage: string
  ) {
    this.errorMessageId = errorMessageId;
    this.user = user;
    this.cleaner = cleaner;
    this.date = date;
    this.operation = operation;
    this.errorMessage = errorMessage;
  }
}

export class ErrorMessageDTO {
  operation: string;
  errorMessage: string;
  cleanerId: number;

  constructor(
    operation: string,
    errorMessage: string,
    cleanerId: number
  ) {
    this.operation = operation;
    this.errorMessage = errorMessage;
    this.cleanerId = cleanerId;
  }
}

export class SchedulingRequest {
  cron: string;
  cleanerId: number;
  operation: string;
  duration: number;

  constructor(
    cron: string,
    cleanerId: number,
    operation: string,
    duration: number
  ) {
    this.cron = cron;
    this.cleanerId = cleanerId;
    this.operation = operation;
    this.duration = duration;
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