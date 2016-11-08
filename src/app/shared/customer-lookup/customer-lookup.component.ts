import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.css']
})
export class CustomerLookupComponent implements OnInit {
  /* 
    # Integrate Clearbit into Coppia API, should not store API key on web source files. Needs to be protected on server. #

    Need an input for customer email
    Validate input is valid email address
    When is valid, call customerService.search
    display result if found

    Need an Output for customerLookupResult

    Might need to make this a Directive (just for lookup calls), move the display of the customer to a component 
    This way it's reusable for existing customers vs the lookup

  */
  @Input() email: string;
  @Output() customerLookupResult: any;


  constructor() { }

  ngOnInit() {
  }

}
