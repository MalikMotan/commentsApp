(function() {
  'use strict';

  angular
    .module('commentsApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
