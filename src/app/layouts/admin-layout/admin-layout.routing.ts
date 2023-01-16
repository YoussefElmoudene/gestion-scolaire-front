import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import {UserListComponent} from "../../components/admin/users/user-list/user-list.component";
import {SpecialityComponent} from "../../components/admin/speciality/speciality.component";
import {GroupeComponent} from "../../components/admin/groupe/groupe.component";
import {ModuleListComponent} from "../../components/admin/module/module-list/module-list.component";
import {ScheduleComponent} from "../../components/admin/schedule/schedule.component";
import {MainGroupStudentComponent} from "../../components/admin/users/main-group-student/main-group-student.component";
import {NoteListComponent} from "../../components/admin/notes/note-list/note-list.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'users',         component: UserListComponent },
    { path: 'specialite',         component: SpecialityComponent },
    { path: 'modules',         component: ModuleListComponent},
    { path: 'groups',         component: MainGroupStudentComponent },
    { path: 'notes',         component: NoteListComponent },
    { path: 'schedule',         component: ScheduleComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: TablesComponent }
];
