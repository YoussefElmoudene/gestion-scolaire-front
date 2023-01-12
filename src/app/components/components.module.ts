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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgbModule
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
    CreateGroupComponent
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
