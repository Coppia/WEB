import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
/* Import App Modules */
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';

import {
  ApiService,
  AuthGuardService,
  AuthResolverService,
  DashboardService,
  JwtService,
  SharedModule,
  SideBarComponent,
  UserService
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    DashboardModule,
    LoginModule,
    rootRouting,
    SharedModule
  ],
  providers: [
    ApiService,
    AuthGuardService,
    AuthResolverService,
    DashboardService,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
