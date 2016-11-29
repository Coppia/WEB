import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IdeasComponent } from './ideas.component';
import { EditorComponent } from './editor/editor.component';
import { EditableIdeaResolver } from './editor/editable-idea-resolver.service';

import { SharedModule, AuthGuardService } from '../shared';

const ideasRoutes: Routes = [
  {
    path: 'ideas',
    component: IdeasComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'ideas/edit/:id',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      idea: EditableIdeaResolver
    }
  },
  {
    path: 'ideas/add',
    component: EditorComponent,
    canActivate: [AuthGuardService]
  }
];

const ideasRouting: ModuleWithProviders = RouterModule.forChild(ideasRoutes);

@NgModule({
  imports: [
    ideasRouting,
    SharedModule,
    NgbModule
  ],
  declarations: [
    IdeasComponent,
    EditorComponent
  ],
  providers: [
    AuthGuardService,
    EditableIdeaResolver
  ]
})
export class IdeasModule { }
