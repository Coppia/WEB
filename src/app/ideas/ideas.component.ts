import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { Idea, IdeaService } from '../shared';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {

  ideas: Idea[];
  ideaCount: number = 0;

  constructor(
    private router: Router,
    private ideaService: IdeaService,
    private notificationsService: NotificationsService
  ) { }

  goto(idea: Idea) {
    this.router.navigate(['/ideas/edit', idea.id]);
  }

  ngOnInit() {
    this.ideaService.get()
    .subscribe(
        data => {
          this.ideas = data;
          this.ideaCount = data.length;
          console.log(this.ideas);
        },
        err => {
          this.notificationsService.error('Oops', `There was problem retrieving your ideas. ${err.message}`);
        }
      );
  }

}
