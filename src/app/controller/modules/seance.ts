import {Groupe} from "./groupe.model";
import {Teacher} from "./teacher.model";
import {Module} from "./module.model";

export class Seance {
  id = 0;
  groupe: Groupe;
  groupId: number;
  teacher: Teacher;
  teacherId = 0;
  module: Module;
  moduleId = 0;
  startTime: string;
  endTime: string;
  daysOfWeek: string;
  allDay: boolean;
  title: string;
}
