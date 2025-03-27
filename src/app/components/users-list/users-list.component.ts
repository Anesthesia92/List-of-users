import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Table, TableModule, TableRowCollapseEvent, TableRowExpandEvent} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {User} from '../../types/user.interface';
import {UsersListService} from '../../service/users-list.service';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-users-list',
  imports: [
    TableModule,
    IconField,
    InputIcon,
    InputText,
    Button,
    Ripple,
  ],
  templateUrl: './users-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit, OnDestroy {
  @ViewChild('dt1') dt1!: Table;
  customers: User[] = [];
  isLoading = false;
  errorMessage = '';
  expandedRows = {};

  private subscription: Subscription;

  constructor(private service: UsersListService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
  this.subscription = this.service.getUsers().subscribe({
      next: (users) => {
        this.customers = users;
        console.log( this.customers);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        console.log('Ошибка загрузки данных');
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
