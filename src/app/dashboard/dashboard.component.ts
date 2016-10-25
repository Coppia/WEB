import { Component, OnInit } from '@angular/core';

import { Dashboard, DashboardService } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ideas: Dashboard[];

  constructor(
    private dashboardService: DashboardService
    ) { }

  ngOnInit() {
    this.dashboardService.get()
    .subscribe(
        data => {
          this.ideas = data;
          console.log(this.ideas);
        },
        err => {
          console.log(err);
        }
      );
  }

}
