describe 'Maze', ->
  maze = null
  it 'should be an object', ->
    maze = new Maze
    expect(typeof maze).toEqual 'object'
  it 'should have a size', ->
    expect(maze.size).toEqual 5
  it 'should have a string id', ->
    (expect typeof maze.id).toEqual 'string'
  it 'should have a cells array', ->
    expect(maze.cells.length).toEqual 5
    for row in maze.cells
      expect(row.length).toEqual 5
  it 'should have all the cells', ->
    for row in maze.cells
      for cell in row
        expect(cell.walls.length).toEqual 4
  it 'should return a cell based on coordinates', ->
    expect(maze.getCell(0,0)).toEqual maze.cells[0][0]
    expect(maze.getCell(3,2)).toEqual maze.cells[3][2]
  it 'should have know if it has unvisited cells', ->
    expect(maze.hasUnvisitedCells()).toBeTruthy()
  it 'should have a current cell', ->
    expect(maze.curr instanceof Cell).toBeTruthy()
    expect(maze.curr.visited).toBeTruthy()
  it 'should have a visited stack, with the current cell as the first item', ->
    expect(maze.visitedStack.length).toBeTruthy()
    expect(maze.visitedStack[0]).toEqual maze.curr
  it 'should join cells and update the current cell', ->
    cell1 = maze.curr
    cell2 = maze.cells[0][1]
    maze.moveTo cell2
    expect(maze.curr).toEqual cell2
    expect(cell1.walls).toEqual '1011'
    expect(cell2.walls).toEqual '1110'
  it 'should reverse successfully', ->
    maze.revertCurrent()
    expect(maze.curr).toEqual maze.cells[0][1]

    maze.cells[1][1].visited = yes
    maze.cells[0][2].visited = yes
    maze.revertCurrent()
    expect(maze.curr).toEqual maze.cells[0][0]

    maze.cells[1][1].visited = no
    maze.cells[0][2].visited = no
  it 'should render the maze successfully', ->
    map = u: 0, r: 1, b: 2, l: 3
    openAt = (cell, dir) -> cell.walls.charAt(map[dir]) is '0'
    maze = new Maze 5
    maze.render()

    for row in maze.cells
      for cell1 in row
        cell2 = cell1.neighbour 'r'
        cell3 = cell1.neighbour 'd'
        cell4 = maze.getCell cell1.x+2, cell1.y+1

        if openAt(cell1, 'r')
          if openAt(cell1, 'b')
            if openAt(cell2, 'b') then expect(openAt(cell3, 'r')).toBeFalsy()
  it 'should have appropriate output', ->
    maze = new Maze 5
    output = maze.render()

    expect(output.length).toEqual 5
    for row in output
      expect(row.length).toEqual 5
      expect(cell.length).toEqual 4 for cell in row
