import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Idea } from '../models';

@Component({
  selector: 'app-idea-preview',
  templateUrl: './idea-preview.component.html',
  styleUrls: ['./idea-preview.component.css']
})
export class IdeaPreviewComponent implements OnInit {
  @Input() idea: Idea;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goto() {
    this.router.navigate(['/ideas', this.idea.id]);
  }

}
