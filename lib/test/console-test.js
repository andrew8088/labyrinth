(function() {
  var maze;

  require('./../algorithms/maze');

  require('./../algorithms/cell');

  require('./../util');

  maze = new Maze;

  console.log(maze.render());

}).call(this);
