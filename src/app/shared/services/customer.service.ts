import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Customer } from '../models';

@Injectable()
export class CustomerService {

  private apiPath = '/customers/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Customer[]> {
    return this.apiService.get(`${this.apiPath}`)
           .map(response => {
             let result = <Customer[]>this.apiService.extractDatas(response);
             return result; });
  }

  find(id: number): Observable<Customer> {
     return this.apiService.get(`${this.apiPath}${id}`)
           .map(response => {
             let result = <Customer>this.apiService.extractData(response);
             return result; });
  }

  lookup(email: string): Observable<Customer> {
    return this.apiService.get(`${this.apiPath}lookup/${email}`)
             .map(data => {
               if (data.success) {
                return data;
               } else {
                 throw data;
               }
              });
  }

  put(customer: Customer): Observable<any> {
    let update = {
      customer_id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      image_link: customer.image_link,
      updated_by: customer.updated_by
    };
    return this.apiService.put(`${this.apiPath}${customer.id}`, update)
             .map(data => data);
  }

  post(customer: Customer): Observable<any> {
    return this.apiService.post(`${this.apiPath}`, customer)
             .map(data => data);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`${this.apiPath}${id}`)
           .map(data => data);
  }
}
