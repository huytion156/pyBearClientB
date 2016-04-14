angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, RestAPIGateWay, RestAPIClient_story) {
  //variable
  $scope.storyList = {};

  //callback
  $scope.play = function(story) {
    RestAPIClient_story.play(story);
  }

  $scope.updateUid = function(uid) {
    console.log(uid);
    RestAPIGateWay.setUID(uid);
    updateList();
  }

  $scope.setVolume = function(volume) {
    console.log(volume);
    RestAPIClient_story.setVolume(volume);
  }

  $scope.updatePlaylist = function(uid) {
    RestAPIClient_story.updatePlaylist(uid, $scope.storyList);
  }

  function updateList() {
    RestAPIClient_story.setList().then(function (data) {
      $scope.storyList = data;
    });
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
