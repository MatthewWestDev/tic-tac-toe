function gameBoard() {
    
     board = ["", "", "", "", "", "", "", "", ""];

     const resetBoard = () => {
        return board = ["", "", "", "", "", "", "", "", ""];
    };
  
    const getBoard = () => board;

    const placeMarker = ( index, player ) => {
        if( board[index] === "" ) {
            board[index] = player;
            return true;
        };
        return false;
      };

      const printBoard = () => {
        console.log(`
            ${board[0]} | ${board[1]} | ${board[2]}
            ---------
            ${board[3]} | ${board[4]} | ${board[5]}
            ---------
            ${board[6]} | ${board[7]} | ${board[8]}
        `)};

    return { getBoard, resetBoard, placeMarker, printBoard };
};



function gameController( playerOneName = "Player One", playerTwoName = "Player Two" ) {

    const board = gameBoard();
    
    const players = [
        { name: playerOneName, marker: "X" }, 
        { name: playerTwoName, marker: "O" }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log( `${getActivePlayer().name}'s turn.` ); 
    };

    let winner = null;
    const getWinner = () => winner;
    let draw = null;
    const getDraw = () => draw;

    function checkForWinner () {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        const b = board.getBoard();
        
        for (let pattern of winPatterns) {
                const [x,y,z] = pattern;
                if( b[x] && b[x] === b[y] && b[x] === b[z] ) {
                return activePlayer;
            }   
        }
        
        return null;
    }

    function checkForDraw () {
        return !board.getBoard().includes("");
    };

    const playRound = ( index ) => {
          
        board.placeMarker( index, getActivePlayer().marker );
        const checkWinner = checkForWinner();
        const checkDraw = checkForDraw();

        if ( checkWinner ) {
            console.log( `${getActivePlayer().name} wins...` );
            winner = true;
        } else if ( checkDraw ) {
            console.log( "It's a draw..." );
            draw = true;
        } else {
            switchPlayerTurn();
            printNewRound();
        };

    };

    printNewRound();

return { getActivePlayer, playRound, getBoard: board.getBoard, getWinner, getDraw };
};



function screenController() {
    const game = gameController();
    const message = document.querySelector(".message");
    const boardDiv = document.querySelector(".board");
    const squares = Array.from( document.getElementsByClassName("square" ));

    function disableSquares() {
        squares.forEach( square => {
            square.disabled = true;
        });
    };

    const updateScreen = () => {

        function resetSquares () {
            squares.forEach( square => {
                square.textContent = "e";
            });
        };
        resetSquares();

        const board = game.getBoard();
        let activePlayer = game.getActivePlayer();
        let winner = game.getWinner();
        let draw = game.getDraw();
        message.textContent =  `${activePlayer.name}'s turn...`;

        
        squares.forEach(( square, index ) => {
            square.textContent = board[index];
        });

        if ( winner !== null ) {
            message.textContent =  `${activePlayer.name} Wins...`;
            disableSquares();
            // show reset and replay buttons
            return;
        }; 
        
        if ( draw !== null ) {
            message.textContent =   `It's a draw...`;
            // show reset and replay buttons
            return;
        };
    };

    function clickHandlerSquares(e) {
        const selectedSquare = e.target.dataset.index;
        game.playRound( selectedSquare );
        updateScreen();
    };
    boardDiv.addEventListener( "click", clickHandlerSquares );

 
    updateScreen();

};

screenController();