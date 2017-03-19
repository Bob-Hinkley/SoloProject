
app.controller('CreateController', function($scope, $http) {
  console.log('Create Controller was loaded');

  $scope.test_id = null;
  $scope.questions = [];


  //Show/hide Create Test forms
  if ($scope.testInput = null){
    $scope.createHtml = true;
  }

  // $scope.addNewQuestion = function() {
  // console.log('Save Question was clicked');

  //Creates testname and Saves to DB
  $scope.createTestName = function() {
    var objectToSend = {
      testName: $scope.testName
    }
    console.log('Creating new test name', objectToSend);
    return $http({
      method: 'POST',
      url: '/create/createTestName',
      data: objectToSend
    }).then(function(response){
      console.log('Getting test_id info: ', response);
      $scope.test_id = response.data[0].tests_id;
      console.log('$scope.test_id is now: ', $scope.test_id);
    }).catch(function(err){
      console.log('Error getting test_id from DB: ', err);
    })
  };

  //adds question to 'mutltiple' table
  $scope.addNewQuestion = function(){
    console.log('Save Question felt something...');
    var objectToSend = {
      question: $scope.question,
      answer1: $scope.answer1,
      answer2: $scope.answer2,
      answer3: $scope.answer3,
      answer4: $scope.answer4,
      correctAnswer: $scope.answer1,
      test_id: $scope.test_id
    };

    console.log('Objects sent to the DB: ', objectToSend);

    return $http({
      method: 'POST',
      url: '/create/addNewQuestion',
      data: objectToSend
    }).then(function(response){
      $scope.showQuestions();
      console.log('Showing questions: ', response);
    }).catch(function(err){
      console.log('Error getting questions from DB: ', err);
    })
  };

  //saves test
  $scope.saveTest = function() {
    var objectToSend = {
      testName: $scope.testName
    }
    console.log('Saving test: ', objectToSend);
    return $http({
      method: 'POST',
      url: '/create/saveTest',
      data: objectToSend
    });
  };




  $scope.showQuestions = function() {
    console.log('Getting from test: ', $scope.test_id);
    return $http({
      method: 'GET',
      url: '/create/showQuestions'
    }).then(function(response){
      console.log('Getting Questions: ', response);
      $scope.questions = response.data;
    }).catch(function(err){
      console.log('Error getting questions from DB: ', err);
    })
  };


  //clears question input fields - multiple choice
  function clearMcQuestion() {
    console.log('Clearing question!');
      document.getElementById("create-multiple").val("");
  }

  //clears question input fields - true/false
  function clearTfQuestion() {
      document.getElementById("tf-temp").val("");
  }



  // $scope.removeQuestions = function() {
  //   var lastItem = $scope.questions.length-1;
  //   $scope.questions.splice(lastItem);
  // };


});


// var question = {question1:"", question2:""}
// objects represent form fields
// object contstructor

//options (data) coming back to client determines formatting
// IF statements on data coming from specific SQL table
//ng-show html template below questions, ng-repeat takes care of the rest
