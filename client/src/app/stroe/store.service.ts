import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class StoreService {
  constructor() { }

  userList: object[] = []
  userCount: number = this.userList.length;

  onHandleChangeUserCount(type: "up" | "down") {
    if (type === "up") { this.userCount++ }
    if (type === "down") { this.userCount-- }
  }
}