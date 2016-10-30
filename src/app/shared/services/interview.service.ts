import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Interview } from '../models';

@Injectable()
export class InterviewService {
  private apiPath = '/interviews/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Interview[]> {
    return this.apiService.get(`${this.apiPath}`)
           .map(data => data);
  }

  find(id: number): Observable<Interview> {
     return this.apiService.get(`${this.apiPath}${id}`)
           .map(data => data);
  }

  put(interview: Interview): Observable<any> {
    return this.apiService.put(`${this.apiPath}${interview.interview_id}`, interview)
             .map(data => data);
  }

  post(interview: Interview): Observable<any> {
    return this.apiService.post(`${this.apiPath}`, interview)
             .map(data => data);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`${this.apiPath}${id}`)
           .map(data => data);
  }

}
