import { Component, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import { Customer } from '../models';
import { CustomerService } from '../services';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.css']
})
export class CustomerLookupComponent implements OnInit, OnChanges {  
  @Input() customer: Customer;
  @Input() search: string;
  @Output() customerLookupResult: any;


  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      if (changes.hasOwnProperty(propName) && propName === 'customer') {
        let changedProp = changes[propName];
        let from = JSON.stringify(changedProp.previousValue);
        let to =   JSON.stringify(changedProp.currentValue);
        log.push( `${propName} changed from ${from} to ${to}`);
      }
    }
    console.log(log.join(', '));
  }
}
