import { useState } from "react"
import GameBorad from "./componets/Gamebord"
import Player from "./componets/Player"
import Log from "./componets/Log";
import { WINNING_COMBINATIONS } from "./winning_combination";
import GameOver from "./componets/GameOver";

const PLAYER = {
  X: "PLAYER 1",
  O: "PLYER 2"
}



const INITAIL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}

function deriveGameBoard(gameTurn) {
  let gameboard = [...INITAIL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}

function deriveWinner(gameboard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

  }
  return winner
}

function App() {

  const [players, setPlayers] = useState({
    PLAYER
  })
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);

  const gameboard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameboard, players);
  const hasDraw = gameTurn.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurns) => {

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

          <Player intialName={PLAYER.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange} />
          <Player intialName={PLAYER.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange} />
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
