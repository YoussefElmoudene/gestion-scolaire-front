import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserListComponent} from "./admin/users/user-list/user-list.component";
import {UserAddComponent} from "./admin/users/user-add/user-add.component";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import { SpecialityComponent } from './admin/speciality/speciality.component';
import { GroupeComponent } from './admin/groupe/groupe.component';
import { CreateSpecialityComponent } from './admin/speciality/create-speciality/create-speciality.component';
import { CreateGroupComponent } from './admin/groupe/create-group/create-group.component';
import { ModuleListComponent } from './admin/module/module-list/module-list.component';
import { ModuleCreateComponent } from './admin/module/module-create/module-create.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { MainGroupStudentComponent } from './admin/users/main-group-student/main-group-student.component';
import { StudentsComponent } from './admin/users/students/students.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import { CreateNoteComponent } from './admin/notes/create-note/create-note.component';
import { NoteListComponent } from './admin/notes/note-list/note-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSlideToggleModule,
    FullCalendarModule,
    MatSelectModule,
    NgbModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    UserListComponent,
    UserAddComponent,
    SpecialityComponent,
    GroupeComponent,
    CreateSpecialityComponent,
    CreateGroupComponent,
    ModuleListComponent,
    ModuleCreateComponent,
    ScheduleComponent,
    MainGroupStudentComponent,
    StudentsComponent,
    CreateNoteComponent,
    NoteListComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    MatSlideToggleModule,
    SidebarComponent
  ]
})
export class ComponentsModule {
}
