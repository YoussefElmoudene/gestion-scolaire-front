import {Component, OnInit} from '@angular/core';
import {SpecialiteService} from "../../../controller/service/specialite.service";
import {Specialite} from "../../../controller/modules/specialite.model";
import {Groupe} from "../../../controller/modules/groupe.model";
import {GroupeService} from "../../../controller/service/groupe.service";
import {Teacher} from "../../../controller/modules/teacher.model";
import {TeacherService} from "../../../controller/service/teacher.service";
import {Module} from "../../../controller/modules/module.model";
import {ModuleService} from "../../../controller/service/module.service";

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {

  groups: Array<Groupe> = new Array<Groupe>();
  modules: Array<Module> = new Array<Module>();

  constructor(private specialiteService: SpecialiteService,
              private moduleService: ModuleService,
              private groupService: GroupeService) {
  }

  ngOnInit(): void {
    this.specialiteService.getAll().subscribe(d => this.specialites = d);
    this.groupService.getAll().subscribe(d => this.groups = d);
    this.moduleService.getAll().subscribe(d => {
      this.modules = d;
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

  getNumberOfModules(specialite: Specialite): number {
    return this.modules.filter(g => g.specialite?.id === specialite.id).length
  }
}
