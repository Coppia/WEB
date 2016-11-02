import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private interviewService: InterviewService) {  }

  ngOnInit() {
    this.getMetaData();
  }

  getMetaData() {
    this.interviewService.customer(this.interview.interview_id)
    .subscribe(
      data => {
          this.customer = data;
          console.log(this.customer);
        },
        err => {
          console.log(err);
        }
    );
  }

  goto() {
    this.router.navigate(['/ideas', this.interview.interview_id]);
  };
}
