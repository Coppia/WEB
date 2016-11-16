import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Customer, CustomerService, Interview, InterviewService, UserService } from '../../shared';
// todo: implement CanDeactivate https://angular.io/docs/ts/latest/guide/router.html#!#can-deactivate-guard
@Component({
  selector: 'app-interview-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  search: string;
  interview: Interview = new Interview();
  customer: Customer = new Customer();
  isSubmitting: boolean = false;
  userId: any;

  constructor(
    private customerService: CustomerService,
    private interviewService: InterviewService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // load prefetched interview
    this.route.data.subscribe(
      (data: {interview: Interview}) => {
        if (data.interview) {
          this.interview = data.interview;
          this.getMetaData();
        }
      }
    );

    this.userService.currentUser.subscribe(
      user => {
        if (this.interview && this.interview.id) {
          this.interview.updated_by = user.username;
        } else {
          this.interview.created_by = user.username;
        }
      }
    );
  }

  getMetaData() {
    this.interviewService.customer(this.interview.id)
    .subscribe(
      data => {
          this.customer = data;
          this.search = data.email;
        },
        err => {
          console.log(err); // todo: handle error. 
        }
    );
  }

  save() {
    // check if interview is new or exists.
    let serviceCall: Observable<any>;
    if (this.interview && this.interview.id) {
      serviceCall = this.interviewService.put(this.interview);
    } else {
      serviceCall = this.interviewService.post(this.interview);
    }
    serviceCall.subscribe(
        data => {
          console.log('interview saved.');
          this.interview.id = data.interview_id;
          this.saveMetaData();
        },
        err => {
          console.log(err); // todo: handle error. 
        }
      );
  }

  saveMetaData() {
    // check if customer is new.
    if (this.customer && this.customer.id === 0) {
      this.customerService.post(this.customer).subscribe(
        data => {
          console.log('customer saved.');
          this.customer.id = data.customer_id;
          this.assignCustomer(this.interview.id, this.customer.id);
        },
        err => {
          console.log(err); // todo: handle error. 
        }
      );
    } else if (this.customer && !this.customer.assigned) {
      this.assignCustomer(this.interview.id, this.customer.id);
    }
  }

  assignCustomer(interview_id: number, customer_id: number) {
    this.interviewService.assign(interview_id, customer_id).subscribe(
      data => {
        console.log('customer assigned.');
      },
      err => {
        console.log(err); // todo: handle error.
      }
    )
  }

}