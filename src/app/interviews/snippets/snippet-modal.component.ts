import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';
import { Idea, IdeaService, Snippet, SnippetService, UserService } from '../../shared';

@Component({
  selector: 'app-snippet-modal',
  templateUrl: './snippet-modal.component.html',
  styleUrls: ['./snippet-modal.component.css']
})
export class SnippetModalComponent implements OnInit  {
  @Input()
  snippet: Snippet;

  ideas: Idea[];
  saving: boolean;

  constructor(
      public activeModal: NgbActiveModal,
      private ideaService: IdeaService,
      private snippetService: SnippetService,
      private userService: UserService,
    private notificationsService: NotificationsService
    ) {}

  ngOnInit() {
    this.ideaService.get()
    .subscribe(
      data => {
        this.ideas = data;
      },
      err => {
        this.notificationsService
          .error('Oops', `There was problem retrieving your ideas. ${err.message}`);
    });
  }

  choose(idea: Idea) {
    this.saveSnippet(idea);
  }

  private saveSnippet(idea: Idea) {
    this.saving = true;
    this.snippetService.post(this.snippet)
    .subscribe(data => {
      console.log('Snippet saved.');
        this.snippet.id = data.snippet_id;
        this.assignSnippet(idea.id);
    },
    err => {
      this.notificationsService
          .error('Oops', `There was problem saving your snippet. ${err.message}`);
      this.saving = false;
    });
  }

  private assignSnippet(idea_id: number) {
    this.ideaService.assignSnippet(idea_id, this.snippet.id)
    .subscribe(data => {
      this.saving = false;
       console.log('Snippet assigned to idea: ' + data.idea_snippet_id);
       this.activeModal.close('Snippet saved.');
    },
    err => {
      this.notificationsService
          .error('Oops', `There was problem saving your snippet. ${err.message}`);
      this.saving = false;
    });
  }
}
