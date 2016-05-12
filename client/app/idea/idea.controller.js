'use strict';

(function() {

class IdeaComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.ideas = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('idea');
    });
  }

  $onInit() {
    this.$http.get('/api/idea').then(response => {
      this.ideas = response.data;
      this.socket.syncUpdates('idea', this.ideas);
    });
  }

  addIdea() {
    if (this.ideaName) {
      this.$http.post('/api/idea', { name: this.ideaName, description: this.ideaDescription });
      this.ideaName = '';
      this.ideaDescription = '';
    }
  }

  deleteIdea(idea) {
    this.$http.delete('/api/idea/' + idea._id);
  }
}

angular.module('coppiaApp')
  .component('idea', {
    templateUrl: 'app/idea/idea.html',
    controller: IdeaComponent
  });

})();
