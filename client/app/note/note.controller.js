'use strict';
(function(){

class NoteComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('coppiaApp')
  .component('note', {
    templateUrl: 'app/note/note.html',
    controller: NoteComponent
  });

})();
