import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { Idea, IdeaService, Interview, InterviewService } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ideas: Idea[];
  interviews: Interview[];

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private interviewService: InterviewService,
    private notificationsService: NotificationsService
  ) { }

  gotoidea(idea: Idea) {
    this.router.navigate(['/ideas/edit', idea.id]);
  }

  gotointerview(interview: Interview) {
    this.router.navigate(['/interviews/edit', interview.id]);
  }

  ngOnInit() {
    this.ideaService.get()
    .subscribe(
        data => {
          this.ideas = data;
        },
        err => {
          this.notificationsService.error('Oops', `There was problem retrieving your ideas. ${err.message}`);
        }
      );
    this.interviewService.get()
    .subscribe(
        data => {
          this.interviews = data;
          console.log(this.interviews);
        },
        err => {
          this.notificationsService.error('Oops', `There was problem retrieving your interviews. ${err.message}`);
        }
      );
  }

}
