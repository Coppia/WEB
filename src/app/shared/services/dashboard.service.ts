import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Dashboard } from '../models';


@Injectable()
export class DashboardService {
  private apiPath = '/dashboard/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Dashboard[]> {
    return this.apiService.get(this.apiPath)
           .map(data => data);
  }
}
