'use strict';

(function() {

class InterviewComponent {

  constructor($http, $scope, $stateParams, $location, socket) {
    this.$http = $http;
    this.socket = socket;
    this.stateParams = $stateParams;
    this.$location = $location;
    this.interviews = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('interview');
    });
  }

  $onInit() {
    if (this.stateParams.id) {
      this.$http.get('/api/interview/' + this.stateParams.id).then(response => {
        this.interview = response.data;
        this.socket.syncUpdates('interview', this.interview);
      });
    } else if (this.stateParams.new) {
      this.interview = {};
    } else {
      this.$http.get('/api/interview').then(response => {
        this.interviews = response.data;
        this.socket.syncUpdates('interviews', this.interviews);
      });
    }
  }

  updateInterview(interview) {
    this.$http.put('/api/interview/' + interview._id, { name: interview.name, customer_email: interview.customer_email, description: interview.description });
    this.$location.path('/interviews');
  }

  addInterview(interview) {
    if (interview.name) {
      this.$http.post('/api/interview', { name: interview.name, customer_email: interview.customer_email, description: interview.description });

      this.$location.path('/interviews');
    }
  }

  deleteInterview(interview) {
      console.log('delete' + interview._id);
    this.$http.delete('/api/interview/' + interview._id);
    //this.$location.path('/interviews');
  }
}

angular.module('coppiaApp')
  .component('interviews', {
    templateUrl: 'app/interview/interviews.html',
    controller: InterviewComponent
  }).component('interview', {
    templateUrl: 'app/interview/interview.html',
    controller: InterviewComponent
  });

})();
