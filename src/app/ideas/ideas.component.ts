import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private ideaService: IdeaService
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
          console.log(err);
        }
      );
  }

}
