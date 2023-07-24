import { useState, useEffect } from 'react'

const XIcon = () => {
  return (
    <div className="font-serif lg:text-9xl sm:text-6xl font-extrabold text-orange-600">X</div>
  )
}
const OIcon = () => {
  return (
    <div className="font-serif lg:text-9xl sm:text-6xl font-extrabold text-blue-600">O</div>
  )
}

const Square = ({ owningPlayer, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex aspect-square items-center justify-center rounded-lg bg-gray-300 shadow-sm hover:shadow-md dark:bg-gray-800"
    >
      {owningPlayer === 'X' && <XIcon />}
      {owningPlayer === 'O' && <OIcon />}
    </button>
  )
}

const Scoreboard = ({ scores }) => {
  return (
    <div className="flex justify-center gap-9 rounded-lg font-mono font-thin dark:text-white">
      <div>X: {scores.X}</div>
      scoreboard
      <div>O: {scores.O}</div>
    </div>
  )
}
const WinningMessage = ({ winner, onButtonClick }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-lg bg-black/60">
      <div className="font-mono text-5xl font-extrabold text-purple-400">
        {winner} WINS!
      </div>
      <button
        onClick={onButtonClick}
        className="rounded-full bg-pink-400 px-2.5 py-1 font-mono text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        new game
      </button>
    </div>
  )
}

const Board = () => {
  const [boardState, setBoardState] = useState(
    Array(9).fill(null) // Array of 9 null values
  )
  const [winner, setWinner] = useState(null)
  const [turn, setTurn] = useState('O')
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
  })

  function updateScores(winningPlayer) {
    if (winningPlayer === 'X') {
      setScores((prevScores) => ({
        ...prevScores,
        X: prevScores.X + 1,
      }))
    } else if (winningPlayer === 'O') {
      setScores((prevScores) => ({
        ...prevScores,
        O: prevScores.O + 1,
      }))
    }
  }

  function checkForWinner() {
    // Define all possible winning combinations (rows, columns, diagonals)
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ]

    // Loop through all the winning combinations
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        // If any of the combinations have all 'X' or all 'O' symbols, we have a winner.
        setWinner(boardState[a])
        updateScores(boardState[a])
        return
      }
    }

    // If no winner is found and all squares are filled, it's a draw.
    if (!boardState.includes(null)) {
      setWinner('EVERYBODY')
    }
  }

  function clickSquare(index) {
    const newBoardState = [...boardState]

    if (newBoardState[index] !== null || winner !== null) {
      return
    }

    newBoardState[index] = turn
    setBoardState(newBoardState)
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  useEffect(() => {
    checkForWinner()
  }, [boardState])

  function handleReset() {
    setBoardState(Array(9).fill(null))
    setWinner(null)
    setTurn('O')
  }

  return (
    <div>
      <Scoreboard scores={scores} />
      <div className="relative grid grid-cols-3 gap-4">
        {boardState.map((player, index) => {
          return (
            <Square
              key={index}
              owningPlayer={player}
              onClick={() => clickSquare(index)}
            />
          )
        })}
        {winner && (
          <WinningMessage winner={winner} onButtonClick={handleReset} />
        )}
      </div>
    </div>
  )
}

export default function TictactoePage() {
  return (
    <div className="mx-auto max-w-lg p-6">
      <Board />
    </div>
  )
}
