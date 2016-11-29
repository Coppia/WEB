import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private router: Router
  ) { }

  ngOnInit() {
    // load prefetched interview
    this.route.data.subscribe(
      (data: {idea: Idea}) => {
        if (data.idea) {
          this.idea = data.idea;
          //this.getMetaData();
        }
      }
    );

    this.userService.currentUser.subscribe(
      user => {
        if (this.idea && this.idea.id) {
          this.idea.updated_by = user.username;
        } else {
          this.idea.created_by = user.username;
        }
      }
    );

    this.ideaService.snippets(this.idea.id)
      .subscribe(data => { this.snippets = data; });
  }

  // getMetaData() {
  //   this.ideaService.customer(this.interview.id)
  //   .subscribe(
  //     data => {
  //         this.customer = data;
  //         this.search = data.email;
  //       },
  //       err => {
  //         console.log(err); // todo: handle error. 
  //       }
  //   );
  // }

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
          //this.saveMetaData();
        },
        err => {
          console.log(err); // todo: handle error. 
        }
      );
  }

  // saveMetaData() {
  //   // check if customer is new.
  //   if (this.customer && this.customer.id === 0) {
  //     this.customerService.post(this.customer).subscribe(
  //       data => {
  //         console.log('customer saved.');
  //         this.customer.id = data.customer_id;
  //         this.assignCustomer(this.interview.id, this.customer.id);
  //       },
  //       err => {
  //         console.log(err); // todo: handle error. 
  //       }
  //     );
  //   } else if (this.customer && !this.customer.assigned) {
  //     this.assignCustomer(this.interview.id, this.customer.id);
  //   }
  // }

}
