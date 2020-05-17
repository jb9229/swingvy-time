export enum ClockType {
  IN, OUT
}

export class Attendance {
  constructor (dateStr: string, address: string, clockType: ClockType) {
    this.dateStr = dateStr;
    this.address = address;
    this.clockType = clockType;
  }
  dateStr: string;
  address: string;
  clockType: ClockType;
}