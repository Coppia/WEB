import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted: boolean = false;
  userId: any;
  active: boolean = true;
  editorForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private ideaService: IdeaService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationsService: NotificationsService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit() {
    this.buildForm();
    // load prefetched interview
    this.route.data.subscribe(
      (data: {idea: Idea}) => {
        if(data.idea) {
          this.idea = data.idea;
          this.buildForm();

          this.active = false;
          setTimeout(() => this.active = true, 0);
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
    let insert: boolean;
    if (this.idea && this.idea.id) {
      serviceCall = this.ideaService.put(this.idea);
      insert = false; 
    } else {
      serviceCall = this.ideaService.post(this.idea);
      insert = true;
    }
    serviceCall.subscribe(
        data => {
          console.log('idea saved.');
          this.idea.id = data.idea_id;
          if (insert) {
            this.notificationsService.success('Saved', 'Idea saved successfully!');
          }
          else {
            this.notificationsService.success('Updated', 'Idea updated successfully!');
          }          
        },
        err => {
          this.notificationsService.error('Oops', `There was problem saving your idea. ${err.message}`);
        }
      );
  }

  buildForm(): void {
    this.editorForm = this.fb.group({
      'title': [this.idea.title, [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      'goal': [this.idea.goal, [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      'status': [this.idea.status, [
          Validators.required
        ]
      ],
    });

    this.editorForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }


  onValueChanged(data?: any) {
    if (!this.editorForm) { return; }
    const form = this.editorForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'title': '',
    'goal': '',
    'status': ''
  };

  validationMessages = {
    'title': {
      'required':      'Title is required.',
      'minlength':     'Title must be at least 4 characters long.'
    },
    'goal': {
      'required':      'Goal is required.',
      'minlength':     'Goal must be at least 4 characters long.'
    },
    'status': {
      'required': 'Status is required.'
    }
  };
}
