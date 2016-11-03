import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { RouterModule, Routes }   from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
/* Import App Modules */
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { IdeasModule } from './ideas/ideas.module';
import { InterviewsModule } from './interviews/interviews.module';

import {
  ApiService,
  AuthGuardService,
  AuthResolverService,
  CustomerService,
  DashboardService,
  IdeaService,
  InterviewService,
  JwtService,
  SharedModule,
  SnippetService,
  SideBarComponent,
  UserService
} from './shared';

const rootRoutes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }
];
const rootRouting: ModuleWithProviders = RouterModule.forRoot(rootRoutes, { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    DashboardModule,
    IdeasModule,
    InterviewsModule,
    LoginModule,
    rootRouting,
    SharedModule
  ],
  providers: [
    ApiService,
    AuthGuardService,
    AuthResolverService,
    CustomerService,
    DashboardService,
    IdeaService,
    InterviewService,
    JwtService,
    SnippetService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
