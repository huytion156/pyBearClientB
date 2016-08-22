angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, RestAPIGateWay, RestAPIClient_story) {
  //variable
  $scope.storyList = {};

  //callback
  $scope.play = function(story) {
    RestAPIClient_story.play(story);
  }


  $scope.setVolume = function(volume) {
    console.log(volume);
    RestAPIClient_story.setVolume(volume);
  }

  $scope.updatePlaylist = function(uid) {
    RestAPIClient_story.updatePlaylist(uid, $scope.storyList);
  }

  $scope.playAILabMp3 = function(uid) {
    RestAPIClient_story.playAILabMp3(uid);
  }

  function updateList() {
    RestAPIClient_story.setList().then(function (data) {
      $scope.storyList = data;
    });
  }


  $rootScope.$on('login_success', function(e) {
    updateList();
  });
  updateList();
})

.controller('UsersCtrl', function($scope, $rootScope, $state, RestAPIGateWay, RestAPIClient_user) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.email ='nhnkhanh@arduino.vn';
  $scope.password = '123456';
  $scope.login = function(email, password) {
    RestAPIClient_user.login(email, password, function(uid) {
      $state.go('tab.dash');
      $rootScope.$emit('login_success');
    });
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
