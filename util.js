function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMat(gBoard, size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: gBoard.minesAroundCount,
                isShown: gBoard.isShown,
                isMine: gBoard.isMine,
                isMarked: gBoard.isMarked
            };
        }
    }
    return board
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
                cellArea.currentCell.push({
                    i,
                    j
                });
                continue;
            }
            var currCell = board[i][j];
            if (currCell.isMine) cellArea.minesAround.push({
                i,
                j
            });
            if (!currCell.isShown) {
                (currCell.minesAroundCount) ? cellArea.numberedCells.push({
                    i,
                    j
                }): cellArea.emptyCells.push({
                    i,
                    j
                });
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

function startTimer() {
    var elMinutes = document.querySelector('.minutes');
    var elSeconds = document.querySelector('.seconds');
    gGame.secsPassed++;

    elSeconds.innerHTML = addZero(gGame.secsPassed % 60);
    elMinutes.innerHTML = addZero(parseInt(gGame.secsPassed / 60));
}

function addZero(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function play() {
    var audio = document.getElementById("audio");
    audio.play();
}
