import { Component, OnInit } from '@angular/core';

import { Idea, IdeaService } from '../shared';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
  ideas: Idea[];

  constructor(
    private ideaService: IdeaService
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
  }

}
