import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';
import { Idea, IdeaService, UserService } from '../../shared';

import { Snippet } from '../../shared/models';

// todo: implement CanDeactivate https://angular.io/docs/ts/latest/guide/router.html#!#can-deactivate-guard
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  search: string;
  idea: Idea = new Idea();
  snippets: Snippet[];
  isSubmitting: boolean = false;
  userId: any;

  constructor(
    private modalService: NgbModal,
    private ideaService: IdeaService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    // load prefetched interview
    this.route.data.subscribe(
      (data: {idea: Idea}) => {
        if (data.idea) {
          this.idea = data.idea;
        }
      }
    );

    this.userService.currentUser.subscribe(
      user => {
        if (this.idea && this.idea.id) {
          this.idea.updated_by = user.username;
        } else {
          this.idea.created_by = user.username;
          this.idea.status = 'UNTESTED';
        }
      }
    );

    this.ideaService.snippets(this.idea.id)
      .subscribe(data => { this.snippets = data; });
  }

  save() {
    // check if interview is new or exists.
    let serviceCall: Observable<any>;
    if (this.idea && this.idea.id) {
      serviceCall = this.ideaService.put(this.idea);
    } else {
      serviceCall = this.ideaService.post(this.idea);
    }
    serviceCall.subscribe(
        data => {
          console.log('idea saved.');
          this.idea.id = data.idea_id;
        },
        err => {
          this.notificationsService.error('Oops', `There was problem saving your idea. ${err.message}`);
        }
      );
  }
}
