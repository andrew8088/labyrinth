#{MazeGenerator} = require ('./mazeGenerator')

class RecursiveBacktrackerGenerator extends MazeGenerator
    constructor: ->
        super
        loop
            break unless @hasUnvisitedCells()
            if @curr.hasUnvisitedNeighbours()
                console.log "current cell: #{@curr.coords()}"
                nextCell = @randomNeighbourOf(@curr)
                @join @curr, nextCell
                @visitedCells.push @curr
                #debugger
                @setCurr nextCell
            else
                @curr = @visitedCells.pop()

(exports ? window).RecursiveBacktrackerGenerator = RecursiveBacktrackerGenerator
