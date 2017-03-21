(function() {
    'use strict';

    angular
        .module('commentsApp')
        .config(config);

    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

    }

})();