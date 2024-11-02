import { useState } from "react"
import GameBorad from "./componets/Gamebord"
import Player from "./componets/Player"
import Log from "./componets/Log";
import { WINNING_COMBINATIONS } from "./winning_combination";
import GameOver from "./componets/GameOver";
const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = '0';
  }
  return currentPlayer
}


function App() {

  const [players, setPlayers] = useState({
    'X': 'Player 1',
    '0': 'Player 2'
  })
  const [gameTurn, setGameTurn] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurn);
  let gameboard = [...intialGameBoard.map(array => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

  }
  const hasDraw = gameTurn.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {

    // setActivePlayer(
    //   (currentActivePlayer) => currentActivePlayer === "X" ? "0" : "X"
    // );
    setGameTurn((prevTurns) => {
      // let currentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = '0';
      // }
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updateTurn = [
        {
          square: {
            row: rowIndex,
            col: colIndex
          },
          player: currentPlayer

        }, ...prevTurns,


      ];
      return updateTurn;
    });

  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      }
    });
  }
  return (

    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player intialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player intialName="Player 2" symbol="O" isActive={activePlayer === "0"} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw
        ) && <GameOver winner={winner} onReStart={handleRestart} />}
        <GameBorad onSelectSquare={handleSelectSquare} board={gameboard} />

      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
