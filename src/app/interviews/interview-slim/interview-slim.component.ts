import { Component, Input, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { InterviewService, Interview, Customer } from '../../shared';

@Component({
  selector: 'app-interview-slim',
  templateUrl: './interview-slim.component.html',
  styleUrls: ['./interview-slim.component.css']
})
export class InterviewSlimComponent implements OnInit {

  @Input() interview: Interview;
  customer: Customer;

  constructor(
    private interviewService: InterviewService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getMetaData();
  }

  getMetaData() {
    this.interviewService.customer(this.interview.id)
    .subscribe(
      data => {
          this.customer = data;
        },
        err => {
          this.notificationsService
          .error('Oops', `There was problem retrieving your "${this.interview.title}" interview. ${err.message}`);
        }
    );
  }


}
