import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { InterviewService } from '../services';
import { Interview, Customer } from '../models';

@Component({
  selector: 'app-interview-preview',
  templateUrl: './interview-preview.component.html',
  styleUrls: ['./interview-preview.component.css']
})
export class InterviewPreviewComponent implements OnInit {
  @Input() interview: Interview;

  customer: Customer;

  constructor(
    private router: Router,
    private interviewService: InterviewService,
    private notificationsService: NotificationsService
  ) {  }

  ngOnInit() {
    this.getMetaData();
  }

  getMetaData() {
    this.interviewService.customer(this.interview.id)
    .subscribe(
      data => {
          this.customer = data;
          console.log(this.customer);
        },
        err => {
          this.notificationsService
          .error('Oops', `There was problem retrieving the customer for your "${this.interview.title}" interview. ${err.message}`);
        }
    );
  }

  goto() {
    this.router.navigate(['/ideas', this.interview.id]);
  };
}
