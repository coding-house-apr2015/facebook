'use strict';

angular.module('facebook')
.controller('ProfileCtrl', function($scope, $window){
  $scope.user = {};

  $scope.cameraOn = function(){
    $window.Webcam.attach('#camera');
  };

  $scope.cameraOff = function(){
    $window.Webcam.reset();
  };

  $scope.takePhoto = function(){
    $window.Webcam.snap(function(dataUri){
      $scope.user.photo = dataUri;
    });
  };
});
