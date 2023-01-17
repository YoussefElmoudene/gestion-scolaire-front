import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: ''},
  {path: '/specialite', title: 'Specialities', icon: 'ni-books text-primary', class: ''},
  {path: '/modules', title: 'Modules', icon: 'ni ni-book-bookmark text-primary', class: ''},
  {path: '/groups', title: 'Groups & Students', icon: ' ni ni-briefcase-24 text-primary', class: ''},
  {path: '/notes', title: 'Notes', icon: ' ni ni-ruler-pencil text-primary', class: ''},
  {path: '/absence', title: 'Absences', icon: ' ni ni-badge text-primary', class: ''},
  {path: '/schedule', title: 'Schedule', icon: ' ni ni-calendar-grid-58 text-primary', class: ''},
  {path: '/icons', title: 'Icons', icon: 'ni-planet text-primary', class: ''},
  {path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-primary', class: ''},
  {path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-primary', class: ''},
  {path: '/users', title: 'All users', icon: 'ni-single-02 text-primary', class: ''},
  {path: '/login', title: 'Login', icon: 'ni-key-25 text-primary', class: ''},
  {path: '/register', title: 'Register', icon: 'ni-circle-08 text-primary', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
