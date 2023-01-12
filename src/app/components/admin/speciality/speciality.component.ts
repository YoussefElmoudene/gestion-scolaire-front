import {Component, OnInit} from '@angular/core';
import {SpecialiteService} from "../../../controller/service/specialite.service";
import {Specialite} from "../../../controller/modules/specialite.model";
import {Groupe} from "../../../controller/modules/groupe.model";
import {GroupeService} from "../../../controller/service/groupe.service";
import {Teacher} from "../../../controller/modules/teacher.model";
import {TeacherService} from "../../../controller/service/teacher.service";

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {

  groups: Array<Groupe> = new Array<Groupe>();
  teachers: Array<Teacher> = new Array<Teacher>();

  constructor(private specialiteService: SpecialiteService,
              private teacherService: TeacherService,
              private groupService: GroupeService) {
  }

  ngOnInit(): void {
    this.specialiteService.getAll().subscribe(d => this.specialites = d);
    this.groupService.getAll().subscribe(d => this.groups = d);
    this.teacherService.getAll().subscribe(d => {
      this.teachers = d
    }, error1 => {
      console.log(error1)
    });
  }

  get specialites(): Array<Specialite> {
    return this.specialiteService.specialites;
  }

  set specialites(value: Array<Specialite>) {
    this.specialiteService.specialites = value;
  }

  get showEdit(): boolean {
    return this.specialiteService.showEdit;
  }

  set showEdit(value: boolean) {
    this.specialiteService.showEdit = value;
  }

  get selectedSpecialite(): Specialite {
    return this.specialiteService.selectedSpecialite;
  }

  set selectedSpecialite(value: Specialite) {
    this.specialiteService.selectedSpecialite = value;
  }


  openNewSpecialty() {
    this.selectedSpecialite = new Specialite();
    this.showEdit = true;
  }

  openUpdate(specialite: Specialite) {
    this.selectedSpecialite = specialite;
    this.showEdit = true;
  }

  getNumberOfGroups(specialite: Specialite): number {
    return this.groups.filter(g => g.specialiteId === specialite.id).length
  }

  getNumberOfTeacher(specialite: Specialite): number {
    return this.teachers.filter(g => g.specialiteId === specialite.id).length
  }
}
