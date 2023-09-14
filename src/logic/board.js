import { WINNER_COMBOS } from "../constants"

export const checkWinnerfrom = (boardToCheck) => {
  //revisamos las combinaciones ganadoras
  for (const combo of WINNER_COMBOS){
    const [a, b, c] = combo
    if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
      return boardToCheck[a]
    }
  }
  //si no hay ganador
  return null
}

export const chechEndGame = (newBoard) => {
    
  return newBoard.every((square) => square !== null) //si todas las posiciones del newBoard son distintas a null
}