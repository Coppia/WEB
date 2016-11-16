import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Interview, Customer } from '../models';

@Injectable()
export class InterviewService {
  private apiPath = '/interviews/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Interview[]> {
    return this.apiService.get(`${this.apiPath}`)
           .map(response => {
             let result = <Interview[]>this.apiService.extractDatas(response);
             return result; });
  }

  find(id: number): Observable<Interview> {
     return this.apiService.get(`${this.apiPath}${id}`)
           .map(response => {
             let result = <Interview>this.apiService.extractData(response);
             return result; });
  }

  put(interview: Interview): Observable<any> {
    return this.apiService.put(`${this.apiPath}${interview.id}`, interview)
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

  customer(id: number): Observable<Customer> {
     return this.apiService.get(`${this.apiPath}interview_customer/${id}`)
           .map(data => {
             data.assigned = true;
             return data;
            });
  }

  assign(id: number, customer_id: number): Observable<any> {
    let postData: any = { 'interview_id': id, 'customer_id': customer_id };
    return this.apiService.post(`${this.apiPath}interview_customer/`, postData)
          .map(data => data);
  }
}
