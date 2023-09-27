import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { UserService } from 'src/app/modules/user/user.service';
import { StoreService } from 'src/app/stroe/store.service';

@Component({
  selector: 'app-default',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css'],
})
export class BackOfficeLayout {
  constructor(
    public readonly storeService: StoreService,
    public readonly userService: UserService,
  ) {
    this.userService.getUserCount();
  }

  mode = new FormControl('over' as MatDrawerMode);
  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
