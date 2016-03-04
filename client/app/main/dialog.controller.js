(function() {
	'use strict';

	class DialogController {
		constructor($mdDialog) {
			this._$mdDialog = $mdDialog;
		}

		cancel() {
			this._$mdDialog.cancel();
		}

		save(thing) {
			this._$mdDialog.hide(thing);
		}

	}


angular.module('projApp')
  .controller('DialogController', DialogController);

})();