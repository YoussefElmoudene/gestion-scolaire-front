import {Component, OnInit} from '@angular/core';
import {SpecialiteService} from "../../../controller/service/specialite.service";
import {Specialite} from "../../../controller/modules/specialite.model";

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.css']
})
export class SpecialityComponent implements OnInit {

  specialite: Specialite;

  constructor(private specialiteService: SpecialiteService) {
  }

  ngOnInit(): void {
    this.specialiteService.getAll().subscribe(d => this.specialites = d);
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
}
