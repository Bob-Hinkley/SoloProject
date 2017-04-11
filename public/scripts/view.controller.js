app.controller('ViewController', function($scope, $http) {
  console.log('View Controller was loaded');


  // $scope.individualTest = $routeParams.individualTest;


  $scope.tests = [];
  $scope.questions = [];
  // $scope.editing = false;

  //shows all of the tests available to specific user logged in
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


  //displays questions in each test
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

  //deletes test from DB
  $scope.deleteTests = function(test_id) {
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

//Logic for when a user clicks on test, it's 'selected' and will display proper questions.
$scope.activeTestIndex;
$scope.showTest = function (index) {
  $scope.activeTestIndex = index;
};
$scope.isShowing = function(index) {
  return $scope.activeTestIndex === index;
}


//Logic for editing test questions.
$scope.selected = {}

$scope.getTemplate = function (individualQuestion) {
 if (individualQuestion.answerID === $scope.selected.answerID){
  return 'edit';
 }
 else return 'display';
};

$scope.editTest = function (individualQuestion) {
 $scope.selected = angular.copy(individualQuestion);
};

// $scope.editKey = function(field) {
//     $scope.editing = $scope.questions.indexOf(field);
//     $scope.newField = angular.copy(field);
// }
//
// $scope.saveField = function(index) {
//     if ($scope.editing !== false) {
//         $scope.questions[$scope.editing] = $scope.newField;
//         $scope.editing = false;
//     }
// };
//
// $scope.cancel = function(index) {
//     if ($scope.editing !== false) {
//         $scope.questions[$scope.editing] = $scope.newField;
//         $scope.editing = false;
//     }
// };




});
