import { ModuleWithProviders, NgModule } from '@angular/core';

import { Routes, RouterModule, CanActivate } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SharedModule, AuthGuardService } from '../shared';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  }
];

const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);

@NgModule({
  imports: [
    dashboardRouting,
    SharedModule
  ],
  declarations: [DashboardComponent],
  providers: [
    AuthGuardService
  ]
})
export class DashboardModule { }
