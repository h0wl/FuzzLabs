
// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

angular.module('fuzzlabsFilters', []).filter('engine_active', function() {
  return function(input) {
    return input ? '\u2713' : '';
  };
}).filter('capitalize', function() {
  return function(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
});

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

var fuzzlabsApp = angular.module('fuzzlabsApp', [
        'ui.router',
        'ui.bootstrap',
        'fuzzlabsFilters'
    ]);

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

fuzzlabsApp.config(['$stateProvider',
  function($stateProvider) {

    var change_page = function(page_name) {
        var items = document.getElementsByClassName("main-menu-item");
        for (var i = 0; i < items.length; i++) {
            $(items[i]).removeClass('active');
        }
        $("li#main_" + page_name).addClass('active');
    }

    $stateProvider.state("Status", {
        views:{
            "status": {
                templateUrl: "templates/status.html"
            }
        },
        abstract: true
    });

    $stateProvider.state("Modal", {
        views:{
            "modal": {
                templateUrl: "templates/modal.html"
            }
        },
        abstract: true
    });

    $stateProvider.state("Modal.addNewEngine", {
        url: "/engines/add",
        views:{
            "modal": {
                templateUrl: "templates/add_engine.html"
            }
        },
        onEnter: function() {
            change_page('engines');
        }
    });

    $stateProvider.state("Modal.pageJobs", {
        url: "/jobs",
        views:{
            "modal": {
                templateUrl: "templates/page_jobs.html"
            }
        },
        onEnter: function() {
            change_page('jobs');
        }
    });

    $stateProvider.state("Modal.pageEngines", {
        url: "/engines",
        views:{
            "modal": {
                templateUrl: "templates/page_engines.html"
            }
        },
        onEnter: function() {
            change_page('engines');
        }
    });

    $stateProvider.state("Modal.pageIssues", {
        url: "/issues",
        views:{
            "modal": {
                templateUrl: "templates/page_issues.html"
            }
        },
        onEnter: function() {
            change_page('issues');
        }
    });

    $stateProvider.state("Modal.pageParser", {
        url: "/parser",
        views:{
            "modal": {
                templateUrl: "templates/page_parser.html"
            }
        },
        onEnter: function() {
            change_page('parser');
        }
    });

}]);

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

fuzzlabsApp.factory('EnginesService', function($interval, $http) {

    var factory = {};

    factory.updateEngineList = function(e_list) {
        window.localStorage.setItem('engines', JSON.stringify(e_list));
    }

    factory.getCurrentEngine = function() {
        return JSON.parse(window.localStorage.getItem("current_engine"));
    }

    factory.setCurrentEngine = function(engine) {
        window.localStorage.setItem('current_engine', JSON.stringify(engine));
    }

    factory.deleteEngine = function(e_id) {
        $http.get('/api/engine/' + e_id + '/delete').
        then(function(response) {
            alert(response.data.message)
        }, function(response) {
            alert("Failed to delete engine.")
        });
    }

    factory.activateEngine = function(e_id) {
        $http.get('/api/engine/' + e_id + '/activate').
        then(function(response) {
            alert(response.data.message)
        }, function(response) {
            alert("Failed to activate engine.")
        });
    }

    factory.validate_engine_name = function(value) {
        return /[a-zA-Z0-9\-\_\.]{1,128}/.test(value);
    }

    factory.validate_engine_address = function(value) {
        return /[a-zA-Z0-9\-\_\.]{5,256}/.test(value);
    }

    factory.validate_engine_port = function(value) {
        if (isNaN(value) == true) return(false);
        i_val = parseInt(value);
        if (i_val < 1 || i_val > 65535) return(false);
        return(true);
    }

    return(factory);
});

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

fuzzlabsApp.factory('JobsService', ['$interval', '$http', function($interval, $http) {

    var factory = {};

    var jobs = [];

    factory.fetch_jobs = function() {
        $http.get('/api/jobs').
        then(function(response) {
            jobs = response.data;
        }, function(response) {
            jobs = null;
        });
    }

    factory.delete_job = function(engine_id, job_id) {
        $http.get('/api/engine/' + engine_id + '/job/' + job_id + '/delete')
    }

    factory.pause_job = function(engine_id, job_id) {
        $http.get('/api/engine/' + engine_id + '/job/' + job_id + '/pause')
    }

    factory.start_job = function(engine_id, job_id) {
        $http.get('/api/engine/' + engine_id + '/job/' + job_id + '/start')
    }

    factory.restart_job = function(engine_id, job_id) {
        $http.get('/api/engine/' + engine_id + '/job/' + job_id + '/restart')
    }

    factory.stop_job = function(engine_id, job_id) {
        $http.get('/api/engine/' + engine_id + '/job/' + job_id + '/stop')
    }

    factory.get_jobs = function() {
        return(jobs);
    }

    $interval(function() {
        factory.fetch_jobs();
    }, 2000);

    return(factory);
}]);

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

fuzzlabsApp.controller('appInitCtrl', ['$scope', '$state', 'EnginesService', function ($scope, $state, EnginesService) {

    $(document).on("click", "#save_engine", function() {
        var e_name = document.getElementById('new_engine_name').value;
        var e_address = document.getElementById('new_engine_address').value;
        var e_port = document.getElementById('new_engine_port').value;
        var e_password = document.getElementById('new_engine_password').value;
        if (EnginesService.validate_engine_name(e_name) == true &&
            EnginesService.validate_engine_address(e_address) == true &&
            EnginesService.validate_engine_port(e_port) == true) {

            data = {
                "name": e_name,
                "address": e_address,
                "port": e_port,
                "password": e_password
            }

            $.ajax({
                url: "/api/engine",
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function() {}
            })
            .done(function() {
                $state.go("Modal.pageEngines");
            })
            .fail(function() {
                alert("Failed to add engine.");
            });

        }
    });

    $state.go("Modal.pageJobs");

}]);

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

fuzzlabsApp.controller('enginesCtrl', ['$state', '$scope', '$interval', 'EnginesService', function ($state, $scope, $interval, EnginesService) {

    $(document).on("click", "button#add_new_engine", function() {
        $state.go("Modal.addNewEngine");
    });

    $(document).on("click", "button#delete_engine", function() {
        var e_name = $(this).attr('engine');
        EnginesService.deleteEngine(e_name);
    });

    $(document).on("click", "button#activate_engine", function() {
        var e_name = $(this).attr('engine');
        EnginesService.activateEngine(e_name);
    });

    $(document).on("click", "button#set_active_engine", function() {
        var e_name = $(this).attr('engine');
        EnginesService.setActiveEngine(e_name);
    });

    $interval(function() { 
        $.ajax({
            url: "/api/engine",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function() {}
        })
        .done(function(data) {
            $scope.engines = data.data;
        })
        .fail(function() {
            console.log("Failed to get engines list.");
            return [];
        });
    }, 3000);

}]);

// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------

fuzzlabsApp.controller('jobsCtrl', ['$state', '$scope', '$interval', 'JobsService', function ($state, $scope, $interval, JobsService) {

    var on_error_page = false;

    $(document).on("click", "button#delete_job", function() {
        var engine_id = $(this).attr('engine');
        var job_id = $(this).attr('job_id');
        JobsService.delete_job(engine_id, job_id);
    });

    $(document).on("click", "button#pause_job", function() {
        var engine_id = $(this).attr('engine');
        var job_id = $(this).attr('job_id');
        JobsService.pause_job(engine_id, job_id);
    });

    $(document).on("click", "button#start_job", function() {
        var engine_id = $(this).attr('engine');
        var job_id = $(this).attr('job_id');
        JobsService.start_job(engine_id, job_id);
    });

    $(document).on("click", "button#restart_job", function() {
        var engine_id = $(this).attr('engine');
        var job_id = $(this).attr('job_id');
        JobsService.restart_job(engine_id, job_id);
    });

    $(document).on("click", "button#stop_job", function() {
        var engine_id = $(this).attr('engine');
        var job_id = $(this).attr('job_id');
        JobsService.stop_job(engine_id, job_id);
    });

    $interval(function() {
        var jobs_list = JobsService.get_jobs();
        /*
        if (jobs_list == null && on_error_page == false) {
            $state.go("Status.engineError"); 
            on_error_page = true;
            // We give 3 minutes to the user to correct the
            // engine settings. After, if the settings are
            // not corrected we drop to the error page again.
            $interval(function() { 
                on_error_page = false;
            }, 180000, 1);
        }
        */
        $scope.jobs = jobs_list;
    }, 1000);

}]);

