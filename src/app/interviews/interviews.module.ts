import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { InterviewsComponent } from './interviews.component';
import { SharedModule, AuthGuardService } from '../shared';
import { InterviewFullComponent } from './interview-full/interview-full.component';
import { InterviewSlimComponent } from './interview-slim/interview-slim.component';

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
    InterviewsComponent,
    InterviewFullComponent,
    InterviewSlimComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class InterviewsModule { }
