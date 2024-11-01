import { useState } from "react"

const intialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

export default function GameBorad() {
    const [gameboard, setGameBoard] = useState(intialGameBoard);
    function handleSelectSquare(rowIndex, colIndex) {

        setGameBoard((prevGameBorad) => {
            const updatedBoard = [...prevGameBorad.map(innerArry => [...innerArry])]
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        })
    }

    return <ol id="game-board" >
        {gameboard.map((row, rowIndex) => <l key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) => <l key={colIndex}>
                    <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                        {playerSymbol}
                    </button>
                </l>)}
            </ol>
        </l>)}

    </ol>
}