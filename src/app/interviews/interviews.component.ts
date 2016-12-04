import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { Interview, InterviewService } from '../shared';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  interviews: Interview[];
  interviewCount: number = 0;

  constructor(
    private router: Router,
    private interviewService: InterviewService,
    private notificationsService: NotificationsService
  ) { }

  goto(interview: Interview) {
    this.router.navigate(['/interviews/edit', interview.id]);
  }

  ngOnInit() {
    this.interviewService.get()
    .subscribe(
        data => {
          this.interviews = data;
          this.interviewCount = data.length;
          console.log(this.interviews);
        },
        err => {
          this.notificationsService
          .error('Oops', `There was problem retrieving your interviews. ${err.message}`);
        }
      );
  }

}
