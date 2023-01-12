import {Component, OnInit} from '@angular/core';
import {SpecialiteService} from "../../../../controller/service/specialite.service";
import {Specialite} from "../../../../controller/modules/specialite.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-speciality',
  templateUrl: './create-speciality.component.html',
  styleUrls: ['./create-speciality.component.css']
})
export class CreateSpecialityComponent implements OnInit {

  constructor(private specialiteService: SpecialiteService,
              private toastr: ToastrService) {
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

  ngOnInit(): void {
  }


  save() {
    if (this.selectedSpecialite?.id === 0) { //create new
      this.specialiteService.save(this.selectedSpecialite).subscribe(d => {
        console.log(d)
        this.specialites.push({...d});
        this.toastr.success('Speciality added successfully');
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    } else { // update

      this.specialiteService.update(this.selectedSpecialite).subscribe(d => {
        console.log(d)
        this.toastr.info('Speciality updated successfully');
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    }
  }
}
