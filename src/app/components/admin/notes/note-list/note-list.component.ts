import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../../controller/service/student.service";
import {Student} from "../../../../controller/modules/student.model";
import {Module} from "../../../../controller/modules/module.model";
import {ModuleService} from "../../../../controller/service/module.service";
import {NoteService} from "../../../../controller/service/note.service";
import {Note} from "../../../../controller/modules/note.model";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  module: Module = new Module();
  modules: Array<Module> = new Array<Module>();
  student: Student;
  students: Array<Student> = new Array<Student>();

  constructor(private studentService: StudentService,
              private noteService: NoteService,
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
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAll().subscribe(data => this.notes = data);
  }

  filterByStudent(student: Student) {
    if (student === null) {
      this.getAllNotes();
    } else {
      if (this.notes?.length === 0) {
        this.noteService.getAll().subscribe(data => this.notes = data.filter(n => n.student?.id === student?.id));
      } else {
        this.notes = this.notes.filter(n => n.student?.id === student?.id);
      }
    }
  }

  filterByModule(module: Module) {
    if (module === null) {
      this.getAllNotes();
    } else {
      if (this.notes?.length === 0) {
        this.noteService.getAll().subscribe(data => this.notes = data.filter(n => n.module?.id === module?.id));
      } else {
        this.notes = this.notes.filter(n => n.module?.id === module?.id);
      }
    }
  }

  openNewNote() {
    this.selectedNote = new Note();
    this.showEdit = true;
  }

  openUpdate(note: Note) {
    this.selectedNote = note;
    this.showEdit = true;
  }
}

