import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';
import { InterviewService, SnippetService } from '../services';

import { Snippet, Customer } from '../models';

@Component({
  selector: 'app-snippet-preview',
  templateUrl: './snippet-preview.component.html',
  styleUrls: ['./snippet-preview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnippetPreviewComponent implements OnInit {
  @Input() snippet: Snippet;
  @Input() index: number;
  @Input() editable: boolean = false;
  @Output() onRemoved = new EventEmitter<number>();

  loading: boolean = true;
  customer: Customer;

  constructor(
    private interviewService: InterviewService,
    private snippetService: SnippetService,
    private notificationsService: NotificationsService
  ) {  }

  ngOnInit() {
    this.getMetaData();
  }

  getMetaData() {
    this.interviewService.customer(this.snippet.interview_id)
    .subscribe(
      data => {
          this.customer = data;
          console.log(this.customer);
        },
        err => {
          this.notificationsService
          .error('Oops', `There was problem retrieving the customer for this snippet. ${err.message}`);
        }
    );
  }

  remove(snippet: Snippet, index: number) {
    debugger;
    this.snippetService.delete(snippet.id)
    .subscribe(
      data => {
        this.onRemoved.emit(index);
      },
      err => {
        this.notificationsService
        .error('Oops', `There was problem removing the snippet. ${err.message}`);
      }
    );
  }
}
