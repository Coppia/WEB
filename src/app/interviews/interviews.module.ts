import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { InterviewsComponent } from './interviews.component';
import { InterviewFullComponent } from './interview-full/interview-full.component';
import { InterviewSlimComponent } from './interview-slim/interview-slim.component';
import { EditorComponent } from './editor/editor.component';
import { EditableInterviewResolver } from './editor/editable-interview-resolver.service';

import { SharedModule, AuthGuardService } from '../shared';

const interviewsRoutes: Routes = [
  {
    path: 'interviews',
    component: InterviewsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'interviews/edit/:id',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      interview: EditableInterviewResolver
    }
  },
  {
    path: 'interviews/add',
    component: EditorComponent,
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
    InterviewSlimComponent,
    EditorComponent
  ],
  providers: [
    AuthGuardService,
    EditableInterviewResolver
  ]
})
export class InterviewsModule { }
