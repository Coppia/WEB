import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';
import { UserService } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Object = { username: '', password: '' };
  errors: Object = {};
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  login() {
      this.userService.attempAuth(this.user)
      .subscribe(
        data => { console.log(data); },
        err => {
          this.errors = err;
          this.isSubmitting = false;
          this.notificationsService.error('Sign in failed', `There was problem signing in. ${err.message}`);
        }
      );
  }
}
