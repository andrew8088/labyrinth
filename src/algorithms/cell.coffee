# The Cell class is aware that each cell is part of a maze, and that every cell created is part of the same maze. The Cell.maze property must be set before cells will be created.
#
# Assumptions:
# - Cell instances will not be used outside of a Maze instance
# - Cell instance methods will not be called until the whole maze is initialied

class Cell
    constructor: (@x, @y, maze) ->
        throw new Error("An x and y coordinate must be supplied") unless @x? and @y?
        throw new Error("Must be part of a maze") unless maze?
        Cell[maze.id] = maze unless Cell[maze.id]?
        @maze = maze.id
        @visited = no
        @walls = '1111'
      neighbour: (dir) ->
        if dir
          switch dir
            when 'u' then c = Cell[@maze].getCell @x - 1, @y
            when 'r' then c = Cell[@maze].getCell @x, @y + 1
            when 'd' then c = Cell[@maze].getCell @x + 1, @y
            when 'l' then c = Cell[@maze].getCell @x, @y - 1
        else
          arr = []
          for dir in ['u','r','d','l']
            n = @neighbour dir
            arr.push n if n?
          arr
      neighbours: (dir) ->
        @neighbour dir
      hasUnvisitedNeighbours: (ret) ->
        arr = []
        #arr.push cell for cell in @neighbours() when cell.visited
        for cell in @neighbours()
          arr.push cell unless cell.visited
        if ret then arr else !!arr.length
      randomUnvisitedNeighbour: ->
        arr = @hasUnvisitedNeighbours true
        arr[UTIL.rand arr.length-1]
      direction: (cell) ->
        if @x is cell.x + 1 and @y is cell.y      then ['u', 0]
        else if @x is cell.x - 1 and @y is cell.y then ['d', 2]
        else if @y is cell.y + 1 and @x is cell.x then ['l', 3]
        else if @y is cell.y - 1 and @x is cell.x then ['r', 1]
        else                                           null
      join: (cell) ->
        dir = @direction cell
        if dir
          offset = if dir[0] is 'd' or dir[0] is 'l' then -2 else 2
          @walls = @walls[0...dir[1]] + '0' + @walls[dir[1] + 1..]
          @visited = yes
          cell.walls = cell.walls[0...dir[1]+offset] + '0' + cell.walls[dir[1]+offset+1..]
          cell.visited = yes
        else
          false
      coords: -> "(#{@x}, #{@y})"
        
(global ? window).Cell = Cell
