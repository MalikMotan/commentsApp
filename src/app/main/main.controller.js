(function() {
    'use strict';

    angular
        .module('commentsApp')
        .controller('MainController', MainController)

    /** @ngInject */
    function MainController($mdDialog, $rootScope, $scope, $compile, $element, $filter, $http) {
        $scope.showAddPopup = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/views/dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })

        };

        $scope.showEditPopup = function(ev, comment) {
            $scope.currentComment = {
                name: 'john',
                body: 'hello john',
                email: 'yours@gmail.com'
            };
            $mdDialog.show({
                controller: DialogController,
                templateUrl: './app/views/editDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    comment: comment,
                    currentComment: $scope.currentComment

                }

            });

        };

        //-------Setup the filter options
        $scope.filter = "id";
        $scope.search = {
            id: '',
            email: ''
        };
        $scope.changeFilterTo = function(pr) {
            $scope.filter = pr;
        };
        //=================comment addition
        var comment = {
            id: '',
            name: '',
            email: '',
            body: ''
        };


        $scope.commentList = [];

        //---------get API data
        $http.get('http://jsonplaceholder.typicode.com/comments').then(function(response) {
            $scope.comments = response.data;
            $scope.size = $scope.commentList.length + 500;


        });
        //-------Delete comment
        $scope.DeleteData = function(com) {
            var _index = $scope.comments.indexOf(com);
            $scope.comments.splice(_index, 1);
            $scope.commentList.length = $scope.commentList.length - 1;
        }

        //---------------------Dialog Controller---------------------------------------------------------

        function DialogController($scope, $mdDialog, $compile) {
            $scope.comList = [];

            $scope.cancel = function() {
                $mdDialog.cancel();
                console.log("dialog was cancelled");
            };

            $scope.DelData = function(com) {
                var _index = $scope.comments.indexOf(com);
                $scope.comList.splice(_index, 1);
            }

            $scope.add = function() {

                var ID = Math.floor(Math.random() * (550 - 501 + 1)) + 501;
                var _com = {
                    id: ID,
                    name: $scope.commentName,
                    body: $scope.commentBody,
                    email: $scope.commentEmail
                };
                $scope.newsize = $scope.newsize + 1;
                console.log($scope.ids);
                $scope.comList.push(_com);
                var divElement = angular.element(document.querySelector('#commentDiv'));
                var appendHtml = $compile('<div class="pad" ng-repeat="comment in comList">' +
                    '<span class="card-title">{{comment.name }} : {{comment.id}}</span>' +
                    '<md-card class="card" layout="row" layout-margin>' +
                    '<md-card-title>' +
                    '<md-card-title-text>' +
                    '<span flex="85">{{comment.body}}</span>' +
                    '<div flex></div>' +
                    '<h4> <span class="md-raised md-primary adjust"  md-colors="background: light-blue" >{{comment.email}}</span></h4>' +
                    '</md-card-title-text>' +
                    '</md-card-title>' +
                    '<md-card-actions layout="column">' +
                    '<div class="compress">' +
                    '<md-button class="md-icon-button" ng-click="cancel()" aria-label="edit comment">' +
                    '<md-icon md-svg-icon="assets/images/ic_edit.svg" class="material-icons resize"></md-icon>' +
                    '</md-button>' +
                    '<md-button class="md-icon-button" aria-label="delete comment" ng-click="DelData(comment)">' +
                    '<md-icon md-svg-icon="assets/images/ic_close.svg" class=" material-icons resize"></md-icon>' +
                    '</md-button>' +
                    '</div>' +
                    '</md-card-actions>' +
                    '</md-card>' +
                    '</div>')($scope.$new());
                divElement.append(appendHtml);
                closeDialog();

            }

            function closeDialog() {
                $mdDialog.hide("finished");

            }

            $scope.editComment = function() {
                console.log(comment);
                closeDialog();
            }

        }

    }
})();