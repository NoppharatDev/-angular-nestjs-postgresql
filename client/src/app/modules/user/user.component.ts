import { Component } from '@angular/core';
import { StoreService } from 'src/app/stroe/store.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../app.component.css']
})

export class UserComponent {
  constructor(
    public readonly storeService: StoreService,
    public readonly userService: UserService
  ) {
    this.userService.getUserList();
    this.userService.getUserInTrashList();
  }

  displayedColumns: string[] = ['no', 'firstName', 'lastName', 'position', 'age', 'email', 'phoneNumber', 'actions'];

  dataSource = [];

}
