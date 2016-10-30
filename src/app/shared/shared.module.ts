import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import {MomentModule} from 'angular2-moment';

import { IdeaPreviewComponent } from './idea-helpers';

import { ShowAuthedDirective } from './directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule
  ],
  declarations: [
    IdeaPreviewComponent,
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule,
    IdeaPreviewComponent,
    ShowAuthedDirective
  ]
})
export class SharedModule { }
