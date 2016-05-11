'use strict';
(function(){

class IdeaComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('coppiaApp')
  .component('idea', {
    templateUrl: 'app/idea/idea.html',
    controller: IdeaComponent
  });

})();
