import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {GroupeService} from "../../../../controller/service/groupe.service";
import {Groupe} from "../../../../controller/modules/groupe.model";
import {Specialite} from "../../../../controller/modules/specialite.model";
import {SpecialiteService} from "../../../../controller/service/specialite.service";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  specialte: Specialite = new Specialite();
  specialtes: Array<Specialite> = new Array<Specialite>();

  constructor(private groupeService: GroupeService,
              private specialteService: SpecialiteService,
              private toastr: ToastrService) {
  }

  get groupes(): Array<Groupe> {
    return this.groupeService.groupes;
  }

  set groupes(value: Array<Groupe>) {
    this.groupeService.groupes = value;
  }

  get showEdit(): boolean {
    return this.groupeService.showEdit;
  }

  set showEdit(value: boolean) {
    this.groupeService.showEdit = value;
  }

  get selectedGroupe(): Groupe {
    return this.groupeService.selectedGroupe;
  }

  set selectedGroupe(value: Groupe) {
    this.groupeService.selectedGroupe = value;
  }

  ngOnInit(): void {
    this.specialteService.getAll().subscribe(d => this.specialtes = d);
  }


  save() {
    if (this.selectedGroupe?.id === 0) { //create new
      this.selectedGroupe.specialiteId = this.specialte.id;
      this.selectedGroupe.specialite = null;
      this.groupeService.save(this.selectedGroupe).subscribe(d => {
        console.log(d)
        this.groupes.push({...d});
        this.toastr.success('Group created successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    } else { // update
      this.groupeService.update(this.selectedGroupe).subscribe(d => {
        console.log(d)
        this.toastr.info('Group updated successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    }
  }

}
