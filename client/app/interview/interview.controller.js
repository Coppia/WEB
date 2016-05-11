'use strict';
(function(){

class InterviewComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('coppiaApp')
  .component('interview', {
    templateUrl: 'app/interview/interview.html',
    controller: InterviewComponent
  });

})();
