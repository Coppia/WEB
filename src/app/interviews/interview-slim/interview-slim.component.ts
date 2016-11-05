import { Component, Input, OnInit } from '@angular/core';

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
    private interviewService: InterviewService
  ) { }

  ngOnInit() {
    this.getMetaData();
  }

  getMetaData() {
    this.interviewService.customer(this.interview.interview_id)
    .subscribe(
      data => {
          this.customer = data;
        },
        err => {
          console.log(err);
        }
    );
  }


}
