import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { InterviewsComponent } from './interviews.component';
import { SharedModule, AuthGuardService } from '../shared';

const interviewsRoutes: Routes = [
  {
    path: 'interviews',
    component: InterviewsComponent,
    canActivate: [AuthGuardService]
  }
];

const interviewsRouting: ModuleWithProviders = RouterModule.forChild(interviewsRoutes);

@NgModule({
  imports: [
    interviewsRouting,
    SharedModule
  ],
  declarations: [
    InterviewsComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class InterviewsModule { }
