import {Component, OnInit} from '@angular/core';
import {Groupe} from "../../../controller/modules/groupe.model";
import {GroupeService} from "../../../controller/service/groupe.service";
import {UserService} from "../../../controller/service/user.service";
import {StudentService} from "../../../controller/service/student.service";
import {Student} from "../../../controller/modules/student.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {


  students: Array<Student> = new Array<Student>();
  constructor(private groupeService: GroupeService,
              private router: Router,
              private studentService: StudentService) {
  }

  get currentGroup(): Groupe {
    return this.groupeService.currentGroup;
  }
  set currentGroup(value: Groupe) {
    this.groupeService.currentGroup = value;
  }
  ngOnInit(): void {
    this.groupeService.getAll().subscribe(g => this.groupes = g);
    this.studentService.getAll().subscribe(g => this.students = g);
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

  getNumberOfStudent(group: Groupe): number {
    return this.students.filter(s => s.groupe?.id === group?.id).length;
  }



  goToAbsence(groupe: Groupe) {
    this.currentGroup = groupe;
    this.router.navigate(['/absence']);
  }
}
