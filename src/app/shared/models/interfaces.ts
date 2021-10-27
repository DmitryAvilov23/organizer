import * as moment from "moment";

export interface IDay {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface IWeek {
  days: IDay[];
}

export interface ITask {
  id?: string;
  taskName: string;
  date?: string;
}

export interface ICreateTaskResponse {
  name: string;
}
