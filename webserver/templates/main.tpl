<!DOCTYPE html>
<html lang="en" ng-app="fuzzlabsApp">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="FuzzLabs - Fuzzing Framework">
    <meta name="author" content="DCNWS">
    <link rel="icon" href="/favicon.ico">

    <title>FuzzLabs</title>

    <script src="/resources/javascript/jquery.min.js"></script>
    <script src="/resources/javascript/angular.min.js"></script>
    <script src="/resources/javascript/angular-ui-router.min.js"></script>
    <script src="/resources/javascript/ui-bootstrap-tpls.min.js"></script>
    <script src="/resources/javascript/jquery.contextMenu.js"></script>
    <script src="/resources/javascript/jquery.ui.position.js"></script>
    <script src="/resources/javascript/jquery-ui.min.js"></script>
    <script src="/resources/javascript/fuzzlabs.js"></script>
    <script src="/resources/javascript/bootstrap.min.js"></script>
    <link href="/resources/stylesheet/jquery-ui.css" rel="stylesheet">
    <link href="/resources/stylesheet/bootstrap.min.css" rel="stylesheet">
    <link href="/resources/stylesheet/jquery.contextMenu.css" rel="stylesheet">
    <link href="/resources/stylesheet/main.css" rel="stylesheet">


    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body ng-controller="appInitCtrl">

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/"><img class="img-responsive-b" src="/resources/images/FuzzLabsLogo.png"></a>
          <a class="navbar-brand" href="#">FuzzLabs</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="main-menu-item active" id="main_jobs"><a href="#jobs">Jobs</a></li>
            <li class="main-menu-item" id="main_issues"><a href="#issues">Issues</a></li>

            <!-- REMOVING REFERENCE AS THESE ARE WORK IN PROGRESS AND THE NEXT DEV ROUND
                 WILL NOT BE FOCUSING ON THEM AS PRIORITIES HAVE CHANGED.
            <li class="main-menu-item" id="main_parser"><a href="#parser">Parser</a></li>
            -->

            <li class="main-menu-item" id="main_engines"><a href="#engines">Engines</a></li>
            <li class="main-menu-item"><a href="http://fuzzlabs.dcnws.com" target="_blank">Documentation</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
              <li class="main-menu-item"><a href="/logout">Logout</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div class="navbar-bottom">
    </div>

    <div class="container" ui-view="status" autoscroll="false"></div>

    <div class="container" ui-view="modal" autoscroll="false"></div>

    <footer class="footer">
      <div class="footer-bottom"></div>
      <div class="container">
        <p class="text-muted">&copy; DCNWS</p>
      </div>
    </footer>

  </body>
</html>

