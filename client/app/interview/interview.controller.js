'use strict';

(function() {

class InterviewComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.interviews = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('interview');
    });
  }

  $onInit() {
    this.$http.get('/api/interview').then(response => {
      this.interviews = response.data;
      this.socket.syncUpdates('interview', this.interviews);
    });
  }

  addInterview() {
    if (this.interviewName) {
      this.$http.post('/api/interview', { name: this.interviewName, description: this.interviewDescription });
      this.interviewName = '';
      this.interviewDescription = '';
    }
  }

  deleteInterview(interview) {
    this.$http.delete('/api/interview/' + interview._id);
  }
}

angular.module('coppiaApp')
  .component('interview', {
    templateUrl: 'app/interview/interview.html',
    controller: InterviewComponent
  });

})();
