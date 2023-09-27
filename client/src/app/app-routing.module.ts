import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { DefaultLayout } from './layouts/default/default.component';
import { BackOfficeLayout } from './layouts/back-office/back-office.component';
import { UserComponent } from './modules/user/user.component';
import { UserFormComponent } from './modules/user/form/user-form.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "back-office",
    component: BackOfficeLayout,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "user",
        children: [
          {
            path: "",
            component: UserComponent
          },
          {
            path: "form",
            children: [
              {
                path: "add",
                component: UserFormComponent
              },
              {
                path: "edit/:userId",
                component: UserFormComponent
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
