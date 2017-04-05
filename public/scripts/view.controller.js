app.controller('ViewController', function($scope, $http) {
  console.log('View Controller was loaded');


  // $scope.individualTest = $routeParams.individualTest;


  $scope.tests = [];
  $scope.questions = [];


  $scope.showTests = function() {
    return $http({
      method: 'GET',
      url: '/view/showTests'
    }).then(function(response){
      console.log('Getting Tests: ', response);
      $scope.tests = response.data;
    }).catch(function(err){
      console.log('Error getting tests from DB: ', err);
    })
  };



  $scope.showQuestions = function(test_id) {
    return $http({
      method: 'GET',
      url: '/view/showQuestions/' + test_id
    }).then(function(response){
      console.log('Getting Questions: ', response);
      $scope.questions = response.data;
    }).catch(function(err){
      console.log('Error getting questions from DB: ', err);
    })
  };

  $scope.deleteTests = function(test_id) {
    // console.log('Deleting tests');
  //   if (req.params.tests_id == tests_id) {
  //     return $http({
  //       method: 'DELETE',
  //       url: '/view/deleteTests/' + tests_id
  //     }).then(function(response){
  //       console.log('Deleting test: ', response);
  //       // $scope.questions = response.data;
  //     }).catch(function(err){
  //       console.log('Error getting questions from DB: ', err);
  //     })
  //   // }
  // } else {
    return $http({
      method: 'DELETE',
      url: '/view/deleteTests/' + test_id
    }).then(function(response){
      console.log('Deleting test: ', response);
      $scope.showTests();
      // $scope.questions = response.data;
    }).catch(function(err){
      console.log('Error getting questions from DB: ', err);
    })
  // }
}



$scope.activeTestIndex;
$scope.showTest = function (index) {
  $scope.activeTestIndex = index;
};
$scope.isShowing = function(index) {
  return $scope.activeTestIndex === index;
}


});
