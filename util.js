function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMat(gBoard, rows, cols) {
    var mat = []
    for (var i = 0; i < rows; i++) {
        var row = []
        for (var j = 0; j < cols; j++) {
            row.push(gBoard);
        }
        mat.push(row);
    }
    return mat;
}

function cellMinesAround(board, cellI, cellJ) {
    var cellArea = {
        currentCell: [],
        minesAround: [],
        numberedCells: [],
        emptyCells: []
    };
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;

            if (i === cellI && j === cellJ) {
                cellArea.currentCell.push({ i, j });
                continue;
            }

            var currCell = board[i][j];
            if (currCell.isMine) cellArea.minesAround.push({ i, j });
            if (!currCell.isShown) {
                (currCell.minesAroundCount) ? cellArea.numberedCells.push({ i, j }) : cellArea.emptyCells.push({ i, j });
            }
        }
    }
    return cellArea.minesAround.length;
}


function expand(coordI, coordJ) {
    var expandCount = 0;
    for (var i = coordI - 1; i <= coordI + 1; i++) {
        if (i < 0 || i >= gBoardMatrix.length) continue;
        for (var j = coordJ - 1; j <= coordJ + 1; j++) {
            if (j < 0 || j >= gBoardMatrix.length) continue;
            if (i === coordI && j === coordJ) continue;
            if (!gBoardMatrix[i][j].isMine && !gBoardMatrix[i][j].isShown && !gBoardMatrix[i][j].isMarked) {
                gBoardMatrix[i][j].isShown = true;
                gGame.shownCount++;
                expandCount++;
            }
        }
    }
    return expandCount;
}