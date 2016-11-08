import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer, Interview, InterviewService, UserService } from '../../shared';
// todo: implement CanDeactivate https://angular.io/docs/ts/latest/guide/router.html#!#can-deactivate-guard
@Component({
  selector: 'app-interview-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  interview: Interview = new Interview();
  customer: Customer = new Customer();
  isSubmitting: boolean = false;
  userId: any;

  constructor(
    private interviewService: InterviewService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // load prefetched article
    this.route.data.subscribe(
      (data: {interview: Interview}) => {
        if (data.interview) {
          this.interview = data.interview;
          this.getMetaData();
        }
      }
    );

    this.userService.currentUser.subscribe(
      user => {
        if (this.interview && this.interview.id) {
          this.interview.updated_by = user.username;
        } else {
          this.interview.created_by = user.username;
        }
      }
    );
  }

  getMetaData() {
    this.interviewService.customer(this.interview.id)
    .subscribe(
      data => {
          this.customer = data;
        },
        err => {
          console.log(err); // todo: handle error. 
        }
    );
  }

  save() {
    if (this.interview && this.interview.id) {
      this.interviewService.put(this.interview).subscribe(
        data => {},
        err => {
          console.log(err); // todo: handle error. 
        }
      );
    } else {
      this.interviewService.post(this.interview).subscribe(
        data => {},
        err => {
          console.log(err); // todo: handle error. 
        }
      );
    }
  }

}
