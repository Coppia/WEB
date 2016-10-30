import { Component, Input, OnInit } from '@angular/core';
import { Idea } from '../models';

@Component({
  selector: 'app-idea-preview',
  templateUrl: './idea-preview.component.html',
  styleUrls: ['./idea-preview.component.css']
})
export class IdeaPreviewComponent implements OnInit {
  @Input() idea: Idea;

  constructor() { }

  ngOnInit() {
  }

}
