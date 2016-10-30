import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared';

const loginRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  }
]);

@NgModule({
  imports: [
    SharedModule,
    loginRouting
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
