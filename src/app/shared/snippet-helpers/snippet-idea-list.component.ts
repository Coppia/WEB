import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { IdeaService, SnippetService } from '../services';

import { Snippet } from '../models';

@Component({
  selector: 'app-snippet-idea-list',
  templateUrl: './snippet-idea-list.component.html',
  styleUrls: ['./snippet-idea-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnippetIdeaListComponent implements OnInit {
  @Input() ideaId: number;
  @Input() limit: number;
  snippets: Snippet[];

  constructor(
    private ideaService: IdeaService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.ideaService.snippets(this.ideaId)
      .subscribe(data => { this.snippets = data; });
  }

  snippetRemoved(index: number) {
    this.snippets.splice(index, 1);
    this.notificationsService.success('Removed', 'Snippet removed successfully!');
  }
}
