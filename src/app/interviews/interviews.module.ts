import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InterviewsComponent } from './interviews.component';
import { InterviewFullComponent } from './interview-full/interview-full.component';
import { InterviewSlimComponent } from './interview-slim/interview-slim.component';
import { EditorComponent } from './editor/editor.component';
import { EditableInterviewResolver } from './editor/editable-interview-resolver.service';
import { SnippetDirective } from './snippets/snippet.directive';
import { SnippetMenuComponent } from './snippets/snippet-menu.component';
import { SnippetModalComponent } from './snippets/snippet-modal.component';

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
    SharedModule,
    NgbModule
  ],
  declarations: [
    InterviewsComponent,
    InterviewFullComponent,
    InterviewSlimComponent,
    EditorComponent,
    SnippetDirective,
    SnippetMenuComponent,
    SnippetModalComponent
  ],
  entryComponents: [ SnippetModalComponent ],
  providers: [
    AuthGuardService,
    EditableInterviewResolver
  ]
})
export class InterviewsModule { }
