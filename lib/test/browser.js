(function() {
  var mazeData, mazeView;

  mazeData = new Maze(30);

  mazeView = new Labyrinth(mazeData.render());

  mazeView.render("maze");

}).call(this);
