class Maze
    constructor: (@size = 5) ->
        @id = "" + +new Date
        @cells = @generateCells()
        @visitedStack = []

        @curr = @cells[0][0]
        @visitedStack.push @curr
        @curr.visited = yes
    generateCells: ->
        arr = []
        for i in [0...@size]
            arr[i] = []
            arr[i][j] = new Cell(i,j, @) for j in [0...@size]
        arr
    getCell: (x, y) -> if 0 <= x < @size and 0 <= y < @size then @cells[x][y] else null
    hasUnvisitedCells: ->
      return true for cell in row when !cell.visited for row in @cells
      false
    moveTo: (cell) ->
      @visitedStack.push cell
      @curr.join cell
      @curr = cell
      @curr.visited = yes
    revertCurrent: -> @curr = @visitedStack.pop() unless @visitedStack.length is 0
    render: ->
      loop
        break unless @hasUnvisitedCells()
        if @curr.hasUnvisitedNeighbours() then @moveTo @curr.randomUnvisitedNeighbour()
        else @revertCurrent()
      @output = []
      for row, i in @cells
        @output[i] = []
        @output[i][j] = cell.walls for cell, j in row
      @output

(global ? window).Maze = Maze
