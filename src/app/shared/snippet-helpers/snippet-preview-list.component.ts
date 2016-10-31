import { Component, Input, OnInit } from '@angular/core';

import { IdeaService } from '../services';

import { Snippet } from '../models';

@Component({
  selector: 'app-snippet-preview-list',
  templateUrl: './snippet-preview-list.component.html',
  styleUrls: ['./snippet-preview-list.component.css']
})
export class SnippetPreviewListComponent implements OnInit {
  @Input() ideaId: number;
  snippets: Snippet[];

  constructor(private ideaService: IdeaService) { }

  ngOnInit() {
    this.ideaService.snippets(this.ideaId)
      .subscribe(data => { this.snippets = data; });
  }
}