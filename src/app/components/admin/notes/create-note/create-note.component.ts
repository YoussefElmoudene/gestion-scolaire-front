import {Component, OnInit} from '@angular/core';
import {Module} from "../../../../controller/modules/module.model";
import {Student} from "../../../../controller/modules/student.model";
import {StudentService} from "../../../../controller/service/student.service";
import {NoteService} from "../../../../controller/service/note.service";
import {ModuleService} from "../../../../controller/service/module.service";
import {Note} from "../../../../controller/modules/note.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  module: Module = new Module();
  modules: Array<Module> = new Array<Module>();
  student: Student;
  students: Array<Student> = new Array<Student>();

  constructor(private studentService: StudentService,
              private noteService: NoteService,
              private toastr: ToastrService,
              private moduleService: ModuleService,
  ) {
  }

  get notes(): Array<Note> {
    return this.noteService.notes;
  }

  set notes(value: Array<Note>) {
    this.noteService.notes = value;
  }

  get showEdit(): boolean {
    return this.noteService.showEdit;
  }

  set showEdit(value: boolean) {
    this.noteService.showEdit = value;
  }

  get selectedNote(): Note {
    return this.noteService.selectedNote;
  }

  set selectedNote(value: Note) {
    this.noteService.selectedNote = value;
  }


  ngOnInit(): void {
    this.moduleService.getAll().subscribe(d => this.modules = d);
    this.studentService.getAll().subscribe(data => this.students = data);
  }


  save() {
    if (this.selectedNote?.id === 0) { //create new
      this.selectedNote.moduleId = this.module.id;
      this.selectedNote.module = null;

      this.selectedNote.studentId = this.student.id;
      this.selectedNote.student = null;

      this.noteService.save(this.selectedNote).subscribe(d => {
        console.log(d)
        this.notes.push({...d});
        this.toastr.success('Note created successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    } else { // update
      this.selectedNote.moduleId = this.module.id;
      this.selectedNote.module = null;
      this.selectedNote.studentId = this.student.id;
      this.selectedNote.student = null;
      this.noteService.update(this.selectedNote).subscribe(d => {
        console.log(d)
        this.toastr.info('Note updated successfully');
        this.showEdit = false;
      }, error => {
        this.toastr.error('something went wrong, please try again.')
        console.log(error)
      });
    }
  }

}
