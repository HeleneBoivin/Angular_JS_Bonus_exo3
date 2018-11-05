// on créé un objet qui contient notre module 'testApp' auquel on a injecté notre dépendance ngroute
var myForm = angular.module("app", ["ngRoute"]);
myForm.run(function($rootScope){
  $rootScope.subjectList = [];
  $rootScope.nameList = [];
  $rootScope.emailList = [];
  $rootScope.textList = [];
});
// configuration du routeur
myForm.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when("/form",{
    templateUrl: "partials/form.html",
    controller: "formCtrl"
  })
  .when("/view/:id?",{
    templateUrl: "partials/view.html",
    controller: "viewCtrl"
  })
  .otherwise({
    redirectTo: "/form"
  })
}]);
// création de notre 1er controller rattaché à notre objet form
myForm.controller("formCtrl", ["$scope", "$rootScope", function($scope, $rootScope){
  $scope.sendIt = function(){
    // $rootScope sert à créer une variable accessible dans tout le document
    $rootScope.subjectList.push($scope.subject);
    $rootScope.nameList.push($scope.name);
    $rootScope.emailList.push($scope.email);
    $rootScope.textList.push($scope.text);
  }
}])
myForm.controller("viewCtrl", ["$scope", "$rootScope", "$routeParams", function($scope, $rootScope, $routeParams){
  $scope.id = $routeParams.id;
  $scope.subject = $rootScope.subjectList[$scope.id];
  $scope.name = $rootScope.nameList[$scope.id];
  $scope.email = $rootScope.emailList[$scope.id];
  $scope.text = $rootScope.textList[$scope.id];
}]);
