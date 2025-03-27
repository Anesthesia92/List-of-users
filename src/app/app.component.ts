import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersListComponent} from './components/users-list/users-list.component';
import {UserHeaderComponent} from './components/user-header/user-header.component';

@Component({
  selector: 'app-root',
  imports: [UsersListComponent, CommonModule, UserHeaderComponent,],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  title = 'list of users';
}
