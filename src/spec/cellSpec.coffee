describe 'Cell', ->
  cell = null
  maze = 
    id: "maze1"
    size: 4
    getCell: (x,y) -> 
      if 0 < x < @size or 0 < y < @size then @cells[x][y] else null
    cells: [[],[]]

  it "should throw an error if less than two parameters are passed in", ->
    expect(-> cell = new Cell).toThrow "An x and y coordinate must be supplied"
  it 'should be an object', ->
    cell = new Cell 0,1, maze
    maze.cells[0][1] = cell
    expect(typeof cell).toEqual 'object'
  it 'should have an x and y coordinates', ->
    expect(cell.x).toEqual 0
    expect(cell.y).toEqual 1
  it 'should have walls', ->
    expect(cell.walls).toEqual '1111'
  it 'should not be visited', ->
    expect(cell.visited).toBeFalsy()
  it 'should know who its accessible neighbours are', ->
    cell = new Cell 0,0, maze
    maze.cells[0][0] = cell
    maze.cells[0][1] = new Cell 0, 1, maze
    maze.cells[1][0] = new Cell 1, 0, maze
    maze.cells[1][1] = new Cell 1, 1, maze

    expect(cell.neighbour("u")).toBeNull()
    expect(cell.neighbour("r").y).toEqual 1
    expect(cell.neighbour("d").x).toEqual 1
    expect(cell.neighbour("l")).toBeNull()
    expect(cell.neighbours().length).toEqual 2
  it 'should return a direction when given a cell', ->
    cell1 = maze.cells[0][0]
    cell2 = maze.cells[0][1]
    cell3 = maze.cells[1][0]
    cell4 = maze.cells[1][1]

    expect(cell1.direction(cell2)).toEqual ['r', 1]
    expect(cell2.direction(cell1)).toEqual ['l', 3]
    expect(cell1.direction(cell3)).toEqual ['d', 2]
    expect(cell3.direction(cell1)).toEqual ['u', 0]
    expect(cell1.direction(cell4)).toBeNull()
  it 'should be able to join cells', ->
    cell1 = maze.cells[0][0]
    cell2 = maze.cells[0][1]

    expect(cell.join(cell2)).toBeTruthy()
    expect(cell1.walls).toEqual '1011'
    expect(cell2.walls).toEqual '1110'
  it 'should know if it has unvisited neighbours', ->
    cell1 = maze.cells[0][0]
    expect(cell1.hasUnvisitedNeighbours()).toBeTruthy()

    maze.cells[1][0].visited = true
    maze.cells[0][1].visited = true
    expect(cell1.hasUnvisitedNeighbours()).toBeFalsy()

    maze.cells[1][0].visited = false
    maze.cells[0][1].visited = false
  it 'should get a random unvisited neighbour', ->
    cell1 = maze.cells[0][0]

    cell2 = cell1.randomUnvisitedNeighbour()
    expect(cell2.visited).toBeFalsy()

    maze.cells[0][1].visited = yes
    cell2 = cell1.randomUnvisitedNeighbour()
    expect(cell2.x).toEqual 1
    expect(cell2.y).toEqual 0
    
