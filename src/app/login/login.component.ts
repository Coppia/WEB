import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private userService: UserService
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
        }
      );
  }
}
