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



function gameController( playerOne, playerTwo ) {

    const board = gameBoard();
    
    playerOneName = playerOne || "Player One";
    playerTwoName = playerTwo || "Player Two";

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
    let game = gameController();
    const boardDiv = document.querySelector(".board");
    const squares = Array.from( document.getElementsByClassName("square" ));
    disableSquares();

    const startModal = document.querySelector("#startModal");
    const message = document.querySelector(".message");

    const gameBtn = document.querySelector("#gameBtn");
    gameBtn.addEventListener("click", () => {
        startModal.showModal();
    });
    const closeModal = document.querySelector(".closeModal");
    closeModal.addEventListener("click", () => {
        statModal.close();
    });

    const playerOne = document.querySelector("#playerone_name");
    const playerTwo = document.querySelector("#playertwo_name");
    const startGameSubmit = document.querySelector("#startGameSubmit");
    
    startGameSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        game = gameController( playerOne.value, playerTwo.value );
        startModal.close();
        updateScreen();
        enableSquares();
    });

    function disableSquares() {
        squares.forEach( square => {
            square.disabled = true;
        });
    };

    function enableSquares() {
        squares.forEach( square => {
            square.disabled = false;
        });
    };

    function updateScreen() {

        squares.forEach( square => {
                square.textContent = "e";
            });

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
            endGame();
        }; 
        
        if ( draw !== null ) {
            message.textContent =   `It's a draw...`;
            endGame();
        };
    };

    function clickHandlerSquares(e) {
        const selectedSquare = e.target.dataset.index;
        game.playRound( selectedSquare );
        updateScreen();
    };
    boardDiv.addEventListener( "click", clickHandlerSquares );

    function endGame() {
        disableSquares();
        gameBtn.textContent = "Play Again!";
    };

};

screenController();