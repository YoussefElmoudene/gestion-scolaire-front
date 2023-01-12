import {Component, OnInit} from '@angular/core';
import {Groupe} from "../../../controller/modules/groupe.model";
import {GroupeService} from "../../../controller/service/groupe.service";

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {


  constructor(private groupeService: GroupeService) {
  }

  ngOnInit(): void {
    this.groupeService.getAll().subscribe(g => this.groupes = g);
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


  openNewGroup() {
    this.selectedGroupe = new Groupe();
    this.showEdit = true;
  }

  openUpdate(groupe: Groupe) {
    this.selectedGroupe = groupe
    this.showEdit = true
  }

}
