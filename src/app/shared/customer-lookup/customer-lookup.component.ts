import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { Customer } from '../models';
import { CustomerService } from '../services';

@Component({
  selector: '[app-customer-lookup]',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.css']
})
export class CustomerLookupComponent implements OnInit, OnChanges {
  private customerFound: boolean = false;
  private searching: boolean = false;
  private initialized: boolean = false;
  @Input() customer: Customer;
  @Input() search: string;
  @Output() customerChange = new EventEmitter();


  constructor(
    private customerService: CustomerService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.customerFound = this.customerIsValid();
    if (!this.customerFound && this.isValidEmail(this.search)) {
      this.lookupCustomer();
    }
    this.initialized = true;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (this.initialized) {
      for (let propName in changes) {
        if (changes.hasOwnProperty(propName)) {
          let changedProp = changes[propName];
          console.log(`${propName} changed: ${changedProp.currentValue}`);
          switch (propName) {
            case 'customer':
              if (changedProp.currentValue && changedProp.currentValue.id) {
                this.customerFound = true;
              }
              break;
            case 'search':
              let isValidCustomer = this.customerIsValid();
              if (this.isValidEmail(changedProp.currentValue) && (!isValidCustomer || changedProp.currentValue !== this.customer.email)) {
                this.lookupCustomer();
              } else {
                this.customerFound = (isValidCustomer &&
                  (!this.isValidEmail(changedProp.currentValue) || (changedProp.currentValue === this.customer.email)));
              }
              break;
          }
        }
      }
    }
  }

  isUndefined(obj) {
    return obj === void 0;
  }

  customerIsValid() {
    return (!this.isUndefined(this.customer) && ((this.customer.id && this.customer.id > 0) || this.customer.success));
  }

  cleanString(value: string) {
    return value.replace(/\s/g, '');
  }

  isValidEmail(value: string) {
    if (this.isUndefined(value) && value !== '') {
      return false;
    }

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return (value.length > 5 && EMAIL_REGEXP.test(this.cleanString(value)));
  }

  lookupCustomer() {
    this.search = this.cleanString(this.search);
    if (this.isValidEmail(this.search)) {
      console.log(`Looking up customer ${this.search}`);
      this.searching = true;
      this.customerService.lookup(this.search)
      .subscribe(
        data => {
            this.customer = data;
            this.searching = false;
            //this.customer.found = this.customerIsValid();
            this.customerChange.emit(data);
          },
          err => {
            this.notificationsService
              .error('Oops', `There was problem finding a customer for ${this.search}. ${err.message}`);
            this.customer.email = this.search;
            this.customer.found = false;
            this.customerFound = false;
            this.searching = false;
          }
      );
    }
  }
}
