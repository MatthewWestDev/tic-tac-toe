function gameBoard() {
    
     board = ["", "", "", "", "", "", "", "", ""];

     const resetBoard = () => {
        return board = ["", "", "", "", "", "", "", "", ""];
    };
  
    const getBoard = () => board;

    const placeMarker = (index, player) => {
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
        const winner = checkForWinner();
        const draw = checkForDraw();

        if ( winner ) {
            console.log( `${getActivePlayer().name} wins...` );
            setGameOver();
        } else if ( draw ) {
            console.log( "It's a Draw..." );
            setGameOver();
        } else {
            switchPlayerTurn();
            printNewRound();
        };

    };

    printNewRound();

    const setGameOver = () => {
        console.log( "Refesh the browser to play again..." );
        return;
    };

return { getActivePlayer, playRound };
};



const game = gameController();