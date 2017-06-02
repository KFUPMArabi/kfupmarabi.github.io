angular.module('arabi', ['ui.router','ngCookies'])


.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/welcome.html'
            })
            .state('start', {
                url: '/start',
                templateUrl: 'partials/home.html'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app.html',
                controller: 'appCtrl'
            })
            .state('app.course', {
                url: '/course',
                templateUrl: 'partials/lesson-list.html',
                controller: 'courseCtrl'
            }).state('app.lesson', {
                url: '/lesson/:id/abstract',
                templateUrl: 'partials/lesson.html',
                controller: 'lessonCtrl'
            }).state('app.store', {
                url: '/store',
                templateUrl: 'partials/store.html',
                controller: 'storeCtrl'
            }).state('app.profile', {
                url: '/profile',
                templateUrl: 'partials/profile.html',
                controller: 'profileCtrl'
            }).state('app.edit_profile', {
                url: '/edit-profile',
                templateUrl: 'partials/edit-profile.html',
                controller: 'editProfileCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'partials/signup.html',
                controller: 'loginCtrl'
            }).state('app.quiz', {
                url: '/lesson/:id/quiz/:qid',
                templateUrl: 'partials/quiz.html',
                controller: 'quizCtrl'
            });
    }]);


angular
    .module('arabi')

    .controller('appCtrl', ['$scope','$cookies', function ($scope, $cookies) {

        $scope.user = angular.fromJson($cookies.get('user'));

        if(!$scope.user){
            console.log("We got you!");
            $scope.user = {
                "name":"Abdullah ALyami",
                "level":"Beginner",
                "avatar":"images/User.png"
            }
            $cookies.put('user', angular.toJson($scope.user));
        }

    }])

    .controller('courseCtrl', ['$scope','$cookies', function ($scope,$cookies) {

        $cookies.put('correct_answers', '0');
        $cookies.put('wrong_answers', '0');

        $scope.lessons_group = [
            {
                "name": "A",
                "description": "Test out of 5 skills",
                "id": "A",
                "lessons": [
                    {
                        "id": 0,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 100,
                        "icon": "images/ex1.png"

                    },
                    {
                        "id": 1,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex2.png"

                    },
                    {
                        "id": 2,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 30,
                        "icon": "images/ex3.png"

                    }
                ]
            },
            {
                "name": "B",
                "description": "Test out of 10 skills",
                "id": "B",
                "lessons": [
                    {
                        "id": 0,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex1.png"

                    },
                    {
                        "id": 1,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex2.png"

                    },
                    {
                        "id": 2,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex3.png"

                    }
                ]
            },
            {
                "name": "C",
                "description": "Test out of 15 skills",
                "id": "C",
                "lessons": [
                    {
                        "id": 0,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex1.png"

                    },
                    {
                        "id": 1,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex2.png"

                    },
                    {
                        "id": 2,
                        "name": "Learn Arabic",
                        "description": "Most Phases spoken at a language",
                        "progress": 60,
                        "icon": "images/ex3.png"

                    }
                ]
            }];
    }])

    .controller('lessonCtrl', ['$scope', function ($scope) {
        $scope.lesson = 0;
        console.log("Now we are here!");
        }])
    .controller('storeCtrl', ['$scope', function ($scope) {

        console.log("Now we are here!storeCtrl");
    }])
    .controller('profileCtrl', ['$scope','$cookies', function ($scope,$cookies) {
        $scope.user = angular.fromJson($cookies.get('user'));

        if(!$scope.user){
            console.log("We got you!");
            $scope.user = {
                "name":"Abdullah ALyami",
                "level":"Beginner",
                "avatar":"images/User.png"
            }
            $cookies.put('user', angular.toJson($scope.user));
        }

        console.log("Now we are here!profile");
    }])
    .controller('editProfileCtrl', ['$scope', function ($scope) {

        console.log("Now we are here!editProfileCtrl");
    }])
    .controller('loginCtrl', ['$scope','$location','$cookies', function ($scope,$location,$cookies) {

        $scope.login = function(){
            if($scope.name){
            $scope.user = {
                "name":$scope.name,
                "level":"Beginner",
                "avatar":"images/User.png"
            }
            $cookies.put('user', angular.toJson($scope.user));

            $location.path( "/start" );
            }else{
                alert("Please Fill the required info.")
            }
        };
        console.log("Now we are here!loginCtrl");
    }])
    .controller('signupCtrl', ['$scope', function ($scope) {

        console.log("Now we are here!signupCtrl");
    }])

    .controller('quizCtrl', ['$scope','$stateParams','$cookies', function ($scope,$stateParams,$cookies) {

        $scope.lesson = $stateParams.id;

        $scope.disable_item = false;

        $scope.correct_answers = $cookies.get('correct_answers');
        if(!$scope.correct_answers)
            $cookies.put('correct_answers', '0');
        $scope.wrong_answers = $cookies.get('wrong_answers');
        if(!$scope.wrong_answers)
            $cookies.put('wrong_answers', '0');

        $scope.questions = [
            {
                "title": "Select translation of “ Boy ”",
                "id": 0,
                "score": 10,
                "isTure":"False",
                "options": [
                    {
                        "id": 0,
                        "answer": "ولد",
                        "description": "waled",
                        "icon": "images/Boy.png",
                        "isCorrect": true
                    },
                    {
                        "id": 1,
                        "answer": "بنت",
                        "description": "Bnt",
                        "icon": "images/Girl.png",
                        "isCorrect": false
                    },
                    {
                        "id": 2,
                        "answer": "أم",
                        "description": "Um",
                        "icon": "images/Mother.png",
                        "isCorrect": false
                    }
                ]
            },
            {
                "title": "Select translation of “ The Car ”",
                "id": 1,
                "score": 10,
                "isTure":"False",
                "options": [
                    {
                        "id": 0,
                        "answer": "السيارة",
                        "description": "Assiarah",
                        "icon": "images/Car.png",
                        "isCorrect": true
                    },
                    {
                        "id": 1,
                        "answer": "الطائرة",
                        "description": "Ataerah",
                        "icon": "images/Plane.png",
                        "isCorrect": false
                    },
                    {
                        "id": 2,
                        "answer": "القطار",
                        "description": "Alqitar",
                        "icon": "images/Train.png",
                        "isCorrect": false
                    }
                ]
            },
            {
                "title": "Select translation of “ Duck ”",
                "id": 2,
                "score": 10,
                "isTure":"False",
                "options": [
                    {
                        "id": 0,
                        "answer": "قطة",
                        "description": "Qettah",
                        "icon": "images/Cat-80.png",
                        "isCorrect": false
                    },
                    {
                        "id": 1,
                        "answer": "بطة",
                        "description": "albattah",
                        "icon": "images/Duck-80.png",
                        "isCorrect": true
                    },
                    {
                        "id": 2,
                        "answer": "دجاجة",
                        "description": "adjajah",
                        "icon": "images/Chicken-80.png",
                        "isCorrect": false
                    }
                ]
            },
            {
                "title": "Write the translation for “ تفاحة ”",
                "id": 3,
                "type":1,
                "score": 1,
                "isTure":"False",
                "CorrectOrg":"Ahmed went to school",
                "answer":""
            }
        ,
            {
                "title": "Write the translation for “ ذهب احمد إلى المدرسة ”",
                "id": 4,
                "type":1,
                "score": 1,
                "isTure":"False",
                "CorrectOrg":"Ahmed went to school",
                "answer":""
            }];
        


        $scope.choose = function(answer){
           $scope.show_correct = false;
            $scope.show_wrong = false;
            $scope.disable_item = true;

            $scope.IsClickEnable = true;
            var score;
            //To Do disable
            for(var i = 0; i<$scope.question.options.length; i++){
                $scope.question.options[i].opCorrect = false;
                $scope.question.options[i].opWrong = false;
            }

            if(answer.isCorrect){
                $scope.show_correct = true;
                answer.opCorrect=true;
                var correct_answers = parseInt($cookies.get('correct_answers'));
                correct_answers++;
                $cookies.put('correct_answers', ''+correct_answers);
            }else{
                $scope.show_wrong=true;
                answer.opWrong=true;
                var wrong_answers = parseInt($cookies.get('wrong_answers'));
                wrong_answers++;
                $cookies.put('wrong_answers', ''+wrong_answers);
            }

        };

        $scope.hide = function(){
            $scope.show_correct = false;
            $scope.show_wrong = false;

        };

        $scope.current_quiz_id = $stateParams.qid;
        $scope.question = $scope.questions[$scope.current_quiz_id];
        $scope.progress = Math.min((1+parseInt($scope.current_quiz_id))*100/$scope.questions.length,100);

        if($scope.questions.length > parseInt($scope.current_quiz_id))//has next quiz
            $scope.next_id = 1 + parseInt($scope.current_quiz_id);


    }]);
