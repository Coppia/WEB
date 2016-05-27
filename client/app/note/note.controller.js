'use strict';

(function() {

class NoteComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.ideas = [];

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('note');
    });
  }

  $onInit() {
    this.$http.get('/api/note').then(response => {
      this.ideas = response.data;
      this.socket.syncUpdates('idea', this.notes);
    });
  }

  addNote() {
    if (this.noteName) {
      this.$http.post('/api/note', { name: this.noteName, description: this.noteDescription });
      this.noteName = '';
      this.noteDescription = '';
    }
  }

  deleteNote(note) {
    this.$http.delete('/api/note/' + note._id);
  }
}

angular.module('coppiaApp')
  .component('note', {
    templateUrl: 'app/note/note.html',
    controller: NoteComponent
  });

})();
