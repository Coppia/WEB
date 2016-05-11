'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
    'title': 'Ideas',
    'state': 'idea'
  }, {
    'title': 'Notes',
    'state': 'note'
  },{
    'title': 'Interviews',
    'state': 'interview'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('coppiaApp')
  .controller('NavbarController', NavbarController);
