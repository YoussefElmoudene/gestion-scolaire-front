import {Groupe} from "./groupe.model";
import {Teacher} from "./teacher.model";
import {Module} from "./module.model";

export class Schedule {
  id = 0;
  groupe: Groupe = new Groupe();
  teacher: Teacher;
  module: Module = new Module();
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
  date: string;
  allDay: boolean;
  groupId: string;
  title: string;
  url: string;
  interactive: boolean;
}
