import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

export interface UserModel {
  userId: string;
  firstName: string;
  lastName: string;
  position: string;
  age: number;
  email: string;
  password: string;
  userCode: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(
    private httpClient: HttpClient
  ) { }

  url = "http://localhost:3030/api/v1/user";

  // userLocalStorage: any = localStorage.getItem('users');
  // users: UserModel[] = localStorage.getItem('users') ? JSON.parse(this.userLocalStorage) : [];

  isLoading: boolean = false;
  data: UserModel[] = [];
  count: number = 0;
  dataTrash: UserModel[] = [];
  public detail: UserModel = {} as UserModel;

  // userCount: number = this.users.length;

  getUserCount() {
    try {
      const data = this.httpClient.get<UserModel[]>(`${this.url}/count`).pipe(catchError(this.handleError<UserModel>(`get user all`)));
      data.subscribe((res: any) => {
        this.count = res.data;
      })
    } catch (error) {
      console.log(error);
    }
  }

  getUserList() {
    try {
      const data = this.httpClient.get<UserModel[]>(`${this.url}`).pipe(catchError(this.handleError<UserModel>(`get user all`)));
      data.subscribe((res: any) => {
        this.data = res.data;
      })
    } catch (error) {
      console.log(error);
    }
  }

  getUserInTrashList() {
    try {
      const data = this.httpClient.get<UserModel[]>(`${this.url}/trash`).pipe(catchError(this.handleError<UserModel>(`get user in trash all`)));
      data.subscribe((res: any) => {
        this.dataTrash = res.data;
      })
    } catch (error) {
      console.log(error);
    }
  }

  async getUserDetail(userId: string): Promise<any> {
    try {
      const data = this.httpClient.get<UserModel[]>(`${this.url}/${userId}`).pipe(catchError(this.handleError<UserModel>(`get user detail`)));
      return data;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  addNewUser(payload: UserModel): boolean {
    try {
      const data = this.httpClient.post<UserModel[]>(`${this.url}`, payload).pipe(catchError(this.handleError<UserModel>(`get user in trash all`)));
      data.subscribe((res: any) => {
        if (res.statusCode == 200 || 201) {
          this.getUserInTrashList();
          this.getUserList();
          this.getUserCount();
          return true;
        } else {
          return false
        }
      })

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  updateUser(userId: string, payload: UserModel): boolean {
    try {
      this.httpClient.put<UserModel[]>(`${this.url}/${userId}`, payload).pipe(catchError(this.handleError<UserModel>(`update user ${userId}`)));
      this.getUserInTrashList();
      this.getUserList();
      this.getUserCount();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  removeUserToTrashList(userId: string) {
    try {
      const data = this.httpClient.delete<UserModel[]>(`${this.url}/remove/${userId}`, {}).pipe(catchError(this.handleError<UserModel>(`get user in trash all`)));
      data.subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.getUserInTrashList();
          this.getUserList();
          this.getUserCount();
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  restoreUserInTrashList(userId: string) {
    try {
      const data = this.httpClient.post<UserModel[]>(`${this.url}/restore/${userId}`, {}).pipe(catchError(this.handleError<UserModel>(`get user in trash all`)));
      data.subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.getUserInTrashList();
          this.getUserList();
          this.getUserCount();
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  // getUserAll() {
  //   return this.users;
  // }

  // addNewUser(userModel: UserModel) {
  //   this.users.push(userModel);
  //   localStorage.setItem('users', JSON.stringify(this.users));
  //   this.userCount++

  //   return {
  //     success: true,
  //     message: "add new user successfully!"
  //   }
  // }
}