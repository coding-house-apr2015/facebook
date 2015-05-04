'use strict';

angular.module('facebook')
.controller('ProfileCtrl', function($scope, $window, Profile){
  $scope.user = {};

  Profile.fetch()
  .then(function(response){
    $scope.user = response.data;
    $scope.user.birthday = new Date(response.data.birthday);
    delete response.data._id;
    delete response.data.uid;
    delete response.data.__v;
    delete response.data.createdAt;
  });

  $scope.update = function(user){
    Profile.update(user)
    .then(function(){
      $window.swal({title: 'Profile Saved', text: 'Your profile was successfully saved to the database.', type: 'success'});
    })
    .catch(function(){
      $window.swal({title: 'Profile Error', text: 'There was a problem saving your profile. Please try again.', type: 'error'});
    });
  };

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
