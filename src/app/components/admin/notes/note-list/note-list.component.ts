import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../../controller/service/student.service";
import {Student} from "../../../../controller/modules/student.model";
import {Module} from "../../../../controller/modules/module.model";
import {ModuleService} from "../../../../controller/service/module.service";
import {NoteService} from "../../../../controller/service/note.service";
import {Note} from "../../../../controller/modules/note.model";
import {AuthService} from "../../../../controller/service/auth.service";
import {User} from "../../../../controller/modules/user.model";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  user: any;
  module: Module = null;
  modules: Array<Module> = new Array<Module>();
  student: Student = null;
  students: Array<Student> = new Array<Student>();

  constructor(private studentService: StudentService,
              private noteService: NoteService,
              private authService: AuthService,
              private exportAsService: ExportAsService,
              private moduleService: ModuleService,
  ) {
  }

  get currentStudent(): Student {
    return this.studentService.currentStudent;
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
    this.user = this.authService.getUserFromLocalCache();
    this.moduleService.getAll().subscribe(d => this.modules = d);
    this.studentService.getAll().subscribe(data => this.students = data);

    if (this.user.role === 'STUDENT') {
      this.noteService.getAll().subscribe(data => this.notes = data.filter(d => d.studentId === this.user.id));
    } else {
      if (this.currentStudent?.id !== 0 && this.currentStudent !== null && this.currentStudent !== undefined) {
        this.filterByStudent(this.currentStudent);
        this.student = this.currentStudent
      } else {
        this.getAllNotes();
      }
    }
  }

  getAllNotes() {
    this.student = null;
    this.module = null;
    this.noteService.getAll().subscribe(data => this.notes = data);
  }

  filterByStudent(student: Student) {
    this.student = student;
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
    this.module = module;
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
  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'les notes',
    options: {
      orientation: '',
      margins: {},
    }
  };
  export(): void {
    this.exportAsService.save(this.exportAsConfig, 'les notes').subscribe(() => {
    });
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }

}

