import { Component, OnInit } from '@angular/core';

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
    private ideaService: IdeaService,
    private interviewService: InterviewService
  ) { }

  ngOnInit() {
    this.ideaService.get()
    .subscribe(
        data => {
          this.ideas = data;
          console.log(this.ideas);
        },
        err => {
          console.log(err);
        }
      );
    this.interviewService.get()
    .subscribe(
        data => {
          this.interviews = data;
          console.log(this.interviews);
        },
        err => {
          console.log(err);
        }
      );
  }

}
