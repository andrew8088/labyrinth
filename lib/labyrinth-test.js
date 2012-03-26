(function() {
  var maze;

  window.mazeData = new RecursiveBacktrackerGenerator(5);

  maze = new Labyrinth(mazeData.toMaze());

  maze.render("maze");

}).call(this);
