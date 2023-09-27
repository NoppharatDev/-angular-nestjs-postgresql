import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { StoreService } from 'src/app/stroe/store.service';
import { UserModel, UserService } from '../user.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['../../../app.component.css']
})

export class UserFormComponent implements OnInit {
  emailValid: boolean = false;
  isLoading: boolean = false;
  detail: UserModel = {} as UserModel;
  userForm = new FormGroup({
    firstName: new FormControl(
      '',
      [Validators.required, Validators.minLength(2)]
    ),
    lastName: new FormControl(
      this.detail.lastName,
      [Validators.required, Validators.minLength(2)]
    ),
    position: new FormControl(
      this.detail.position,
      [Validators.required]
    ),
    age: new FormControl(
      this.detail.age,
      [Validators.required, Validators.pattern(/^(0?[1-9]|[1-9][0-9])$/)]),
    email: new FormControl(
      this.detail.email,
      [Validators.required, Validators.email]),
    password: new FormControl(
      '',
      [Validators.required]),
    userCode: new FormControl(
      this.detail.userCode,
      [Validators.required]),
    phoneNumber: new FormControl(
      this.detail.phoneNumber,
      [Validators.required, Validators.pattern(/^[0]{1}[2-9]{1}[0-9]{8}$/)]),
  });

  constructor(
    public readonly storeService: StoreService,
    public readonly userService: UserService,
    private router: Router,
    public readonly route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    await this.getUserDetail()
  }

  getUserDetail = async () => {
    if (this.route.snapshot.params['userId']) {
      this.isLoading = true;
      const data = await this.userService.getUserDetail(this.route.snapshot.params['userId']);
      data.subscribe({
        next: async (res: any) => {
          this.detail = res.data;
          this.isLoading = false;

          this.setFormVaue()
        },
      })
    }
  }

  setFormVaue = () => {
    this.userForm.setValue({
      firstName: this.detail.firstName,
      lastName: this.detail.lastName,
      age: this.detail.age,
      position: this.detail.position,
      email: this.detail.email,
      phoneNumber: this.detail.phoneNumber,
      password: '',
      userCode: this.detail.phoneNumber
    });

    const password = this.userForm.get('password')
    password?.disable();
  }


  set setDetail(data: any) { this.detail = data }

  get getDetail() { return this.detail; }

  get form() { return this.userForm.controls; }

  onSubmit() {
    this.isLoading = true;
    if (this.userForm.invalid) {
      this.isLoading = false;
      return;
    }

    const value: any = this.userForm.value;
    const userModel: UserModel = {
      userId: uuidv4(),
      firstName: value.firstName,
      lastName: value.lastName,
      position: value.position,
      age: parseInt(value.age),
      email: value.email,
      password: value.password,
      userCode: value.userCode,
      phoneNumber: value.phoneNumber,
    };

    let service = null
    if (this.route.snapshot.params['userId']) {
      service = this.userService.updateUser(this.route.snapshot.params['userId'], userModel)
    } else {
      service = this.userService.addNewUser(userModel)
    }
    console.log(service);
    
    if (service) {
      setTimeout(() => {
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/back-office/user']);
        }, 500);
      }, 1000);
    }

  }
}
