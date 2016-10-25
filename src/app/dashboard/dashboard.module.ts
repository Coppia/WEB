import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SharedModule, AuthGuardService } from '../shared';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  }
];

const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);

@NgModule({
  imports: [
    dashboardRouting,
    CommonModule,
    SharedModule
  ],
  declarations: [DashboardComponent],
  providers: [
    AuthGuardService
  ]
})
export class DashboardModule { }
