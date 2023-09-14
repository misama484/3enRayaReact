/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css'

import Square from './components/Square';
import { TURNS } from './constants'
import { checkWinnerfrom, chechEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';



function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null) //null, no hay ganador, false = empate



  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

 

  const updateBoard = (index) => {
    //no actualizamos si ya esta escrita
    if(board[index] || winner) return
    const newBoard = [ ...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //comprobamos que hay ganador
    const newWinner = checkWinnerfrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (chechEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  return (
    <main className="board">
      <h1>3 en raya</h1>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
                </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = { turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner= {winner}/>
    </main>
  )
}

export default App
