(function() {
  var RecursiveBacktrackerGenerator, maze;

  RecursiveBacktrackerGenerator = require('./recursiveBacktrackerGenerator').RecursiveBacktrackerGenerator;

  maze = new RecursiveBacktrackerGenerator;

  console.log(maze.toString());

}).call(this);
