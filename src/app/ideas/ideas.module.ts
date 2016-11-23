import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { IdeasComponent } from './ideas.component';
import { SharedModule, AuthGuardService } from '../shared';
import { EditorComponent } from './editor/editor.component';


const ideasRoutes: Routes = [
  {
    path: 'ideas',
    component: IdeasComponent,
    canActivate: [AuthGuardService]
  }
];

const ideasRouting: ModuleWithProviders = RouterModule.forChild(ideasRoutes);

@NgModule({
  imports: [
    ideasRouting,
    SharedModule
  ],
  declarations: [
    IdeasComponent,
    EditorComponent
  ],
  providers: [
    AuthGuardService
  ]
})
export class IdeasModule { }
