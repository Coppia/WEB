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
           .map(data => data);
  }

  find(id: number): Observable<Customer> {
     return this.apiService.get(`${this.apiPath}${id}`)
           .map(data => data);
  }

  put(customer: Customer): Observable<any> {
    let update = {
      customer_id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      image_link: customer.image_link,
      update_user: customer.update_user
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
