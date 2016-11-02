import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { InterviewService } from '../services';

import { Snippet, Customer } from '../models';

@Component({
  selector: 'app-snippet-preview',
  templateUrl: './snippet-preview.component.html',
  styleUrls: ['./snippet-preview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SnippetPreviewComponent implements OnInit {
  @Input() snippet: Snippet;

  loading: boolean = true;
  customer: Customer;

  constructor(private interviewService: InterviewService) {  }

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
          console.log(err);
        }
    );
  }
}
