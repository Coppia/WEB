import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Dashboard } from '../models';


@Injectable()
export class DashboardService {
  private dashboardApiUrl = '/dashboard/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Dashboard[]> {
    return this.apiService.get(this.dashboardApiUrl)
           .map(data => data);
  }
}
