function gameBoard() {
    const board = [];
  
    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3 ; j++){
            board[i].push(null);
        }
    }

    const getBoard = () => board;

    
    const placeMarker = (row, column, player) => {
        if( board[row][column] === null ) {
            board[row][column].addMarker(player);
        };
      };


      const printBoard = () => {
        console.log(`
          ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
          ---------
          ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
          ---------
          ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
        `);
      };


    return { getBoard, placeMarker, printBoard };
};


const playGame = function ( playerOne, playerTwo ) {
    


    // loop rounds until winner or all positions are selected in a tie

    // get player one position for X

    // board[1] = "X";
    // console.log(board[1]);


    // get player two position for O

    // check for winner or tie



};



// Player object
function createPlayer( name, marker ) {
    return { name, marker };
    
    // start sets player one name with marker X
    // start sets player two name with marker O

};


function playRound ( position, marker ) {
    // push the marker to the position equal to the board object property

    board[ position ].push( marker );
};
