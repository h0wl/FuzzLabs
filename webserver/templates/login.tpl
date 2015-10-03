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
    <script src="/resources/javascript/ui-bootstrap-tpls.min.js"></script>
    <script src="/resources/javascript/jquery.contextMenu.js"></script>
    <script src="/resources/javascript/jquery.ui.position.js"></script>
    <script src="/resources/javascript/jquery-ui.min.js"></script>
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
            <li class="main-menu-item"><a href="/">Home</a></li>
            <li class="main-menu-item"><a href="http://fuzzlabs.dcnws.com" target="_blank">Documentation</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
              <li class="main-menu-item"><a href="/register">Register</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <div class="navbar-bottom">
    </div>

    <div class="container">
      <form class="form-signin" action="/login" method="POST">
        <h2 class="form-signin-heading">FuzzLabs Login</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input name="username" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block btn-login" type="submit">Sign in</button>
      </form>
    </div>

    <footer class="footer">
      <div class="footer-bottom"></div>
      <div class="container">
        <p class="text-muted">&copy; DCNWS</p>
      </div>
    </footer>

  </body>
</html>

