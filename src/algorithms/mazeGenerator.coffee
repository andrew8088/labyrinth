class MazeGenerator
    constructor: (@size = 5) ->
        Cell.max = @size - 1
        @visitedCells = []
        @maze = []
        @maze[i] = @addRow(i) for i in [0...@size]
        Cell.maze = @maze
        @setCurr @maze[@rand()][@rand()]
    addRow: (r) ->
        arr = []
        arr[c] = new Cell(r, c) for c in [0...@size]
    rand: (max = @size - 1, min = 0) -> Math.floor(Math.random() * (max - min + 1)) + min
    randDir: -> ['u', 'r', 'd', 'l'][@rand 3]
    hasUnvisitedCells: ->
        for row in @maze
            for cell in row
                return true unless cell.visited
        false
    numOfVisitedCells: ->
        i = 0
        for row in @maze
            for cell in row
                i++ if cell.visited
        [i, @size * @size - i]

    setCurr: (cell) ->
        cell.visited = yes
        cell.checkNeighbours()
        @curr = cell
    find: (cell, dir) -> 
        switch (dir)
          when 'u' then @maze[cell.x - 1][cell.y]
          when 'r' then @maze[cell.x][cell.y + 1]
          when 'd' then @maze[cell.x + 1][cell.y]
          when 'l' then @maze[cell.x][cell.y - 1]
    join: (cell1, cell2) ->
        if cell1.x is cell2.x
            if cell1.y - 1 is cell2.y # left
                cell1.open 'l'
                cell2.open 'r'
            else                      # right
                cell1.open 'r'
                cell2.open 'l'
        else
            if cell1.x - 1 is cell2.x # up
                cell1.open 'u'
                cell2.open 'd'
            else                      # down
                cell1.open 'd'
                cell2.open 'u'

    randomNeighbourOf: (cell) ->
        dir = @randDir()
        dir = @randDir() until cell.canVisit dir
        @find cell, dir
    toString: ->
        str = ""
        for row in @maze
            for cell in row
                str += "#{cell} "
            str += "\n"
        str
    toMaze: ->
        maze = []
        for row in @maze
            arr = []
            arr[i] = cell.walls for cell, i in row
            maze.push arr
        maze

class Cell
    constructor: (@x, @y) -> 
        @visited = no
        @newNeighbours = ['u', 'r', 'd', 'l']
        @walls = '1111'
        @visit 'u' if @x is 0
        @visit 'r' if @y is Cell.max
        @visit 'd' if @x is Cell.max
        @visit 'l' if @y is 0
    canVisit: (dir) ->
        dir in @newNeighbours
    hasUnvisitedNeighbours: ->
        @newNeighbours.length > 0
    checkNeighbours: ->
        console.log "Before #{@coords()} neighbour check: #{@newNeighbours}"
        for dir in @newNeighbours
            switch dir
                when 'u' then c = Cell.maze[@x - 1][@y]
                when 'r' then c = Cell.maze[@x][@y + 1]
                when 'd' then c = Cell.maze[@x + 1][@y]
                when 'l' then c = Cell.maze[@x][@y - 1]
            @visit dir if c.visited
        console.log "After #{@coords()} neighbour check: #{@newNeighbours}"
    visit: (dir) ->
        i = @newNeighbours.indexOf dir
        @newNeighbours = @newNeighbours[0...i].concat @newNeighbours[i + 1..]
    open: (dir) ->
        @visit dir
        i = Cell.dirMap[dir]
        @walls = @walls[0...i] + '0' + @walls[i + 1..]
    toString: -> @walls
    coords: -> "(#{@x}, #{@y})"
    newNeighbours: ->
        str = ""
        str += "#{k}, " for k in @newNeighbours
        str

Cell.dirMap = u: 0, r: 1, d: 2, l: 3
        
(exports ? window).MazeGenerator = MazeGenerator
