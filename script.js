function gameBoard() {
    
    const board = [];
  
    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3 ; j++){
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        if( board[row][column].getValue() === "" ) {
            board[row][column].addMarker(player);
        };
      };

      const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.table(boardWithCellValues);
      };

    return { getBoard, placeMarker, printBoard };
};


function cell() {
    let value = "";

    const addMarker = (player) => {
        value = player;
    };
    
    const getValue = () => value;

    return { addMarker, getValue };
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

    const playRound = ( row, column ) => {
        
        console.log( `Placing ${getActivePlayer().name}'s token into row ${row} column ${column}...` );
          
        board.placeMarker( row, column, getActivePlayer().marker );

        //Check for winner

        switchPlayerTurn();
        
        printNewRound();

    };

    printNewRound();


return { getActivePlayer, playRound };
};
const game = gameController();