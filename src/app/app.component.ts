import { Component, OnInit } from '@angular/core';

import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor (
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(authenticated => { this.isAuthenticated = authenticated; });

    this.userService.populate();
  }
}
