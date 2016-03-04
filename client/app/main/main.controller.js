'use strict';

(function() {

class MainController {

  constructor($http, $mdDialog) {
    this.$http = $http;
    this._$mdDialog = $mdDialog;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }

  showDialog(ev) {
    this._$mdDialog.show({
      controller: 'DialogController',
      controllerAs: 'dialog',
      templateUrl: '/app/main/thing.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {
        addThing: this.addThing
      }
    })
    .then((thing) => {
      if(thing) {
        this.addThing(thing);
      }
    });
  }

  addThing(thing) {
    this.$http.post('/api/things', thing)
      .then(() => {
        this.awesomeThings.push(thing);
      });
  }

  showConfirm(ev, thing) {
    var confirm = this._$mdDialog.confirm()
          .title('Would you like to delete this thing?')
          .textContent('This item will be removed from the list!')
          .ariaLabel('remove')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel');
    this._$mdDialog.show(confirm).then(() => {
      this.deleteThing(thing);
    });
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id)
      .then(() => {
        this.awesomeThings.splice(this.awesomeThings.indexOf(thing), 1);
      });
  }
}

angular.module('projApp')
  .controller('MainController', MainController);

})();
