export type Piece = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null
export type Board = Piece[][]

export interface CastlingRights {
  whiteKingside: boolean
  whiteQueenside: boolean
  blackKingside: boolean
  blackQueenside: boolean
}

export interface GameState {
  board: Board
  isWhiteTurn: boolean
  castlingRights: CastlingRights
  lastMove: [number, number, number, number] | null
  enPassantTarget: [number, number] | null
}

/**
 * Helper: Get piece color
 */
export const getPieceColor = (piece: Piece): 'white' | 'black' | null => {
  if (!piece) return null
  return piece === piece.toUpperCase() ? 'white' : 'black'
}

/**
 * Helper: Check if square is on the board
 */
const isOnBoard = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8
}

/**
 * Helper: Get all squares attacked by sliding pieces (rook, bishop, queen direction)
 */
const getSlidingMoves = (
  row: number,
  col: number,
  directions: [number, number][],
  board: Board,
  stopAtFirstPiece = false
): [number, number][] => {
  const moves: [number, number][] = []
  const piece = board[row][col]
  if (!piece) return moves

  const color = getPieceColor(piece)

  for (const [dr, dc] of directions) {
    let newRow = row + dr
    let newCol = col + dc

    while (isOnBoard(newRow, newCol)) {
      const target = board[newRow][newCol]

      if (!target) {
        moves.push([newRow, newCol])
      } else {
        if (getPieceColor(target) !== color) {
          moves.push([newRow, newCol])
        }
        break
      }

      newRow += dr
      newCol += dc

      if (stopAtFirstPiece) break
    }
  }

  return moves
}

/**
 * Get valid moves for a pawn
 */
export const getPawnMoves = (
  row: number,
  col: number,
  board: Board,
  isWhite: boolean,
  enPassantTarget: [number, number] | null = null
): [number, number][] => {
  const moves: [number, number][] = []
  const piece = board[row][col]

  if (!piece || piece.toLowerCase() !== 'p') return moves

  const direction = isWhite ? -1 : 1
  const startRow = isWhite ? 6 : 1

  // Forward move
  const forwardRow = row + direction
  if (isOnBoard(forwardRow, col) && !board[forwardRow][col]) {
    moves.push([forwardRow, col])

    // Double move from start
    const doubleRow = row + direction * 2
    if (row === startRow && !board[doubleRow][col]) {
      moves.push([doubleRow, col])
    }
  }

  // Captures
  for (const dcol of [-1, 1]) {
    const captureRow = row + direction
    const captureCol = col + dcol

    if (isOnBoard(captureRow, captureCol)) {
      const target = board[captureRow][captureCol]

      // Normal capture
      if (target && getPieceColor(target) !== getPieceColor(piece)) {
        moves.push([captureRow, captureCol])
      }

      // En passant
      if (
        enPassantTarget &&
        captureRow === enPassantTarget[0] &&
        captureCol === enPassantTarget[1]
      ) {
        moves.push([captureRow, captureCol])
      }
    }
  }

  return moves
}

/**
 * Get valid moves for a knight
 */
export const getKnightMoves = (
  row: number,
  col: number,
  board: Board
): [number, number][] => {
  const piece = board[row][col]
  if (!piece || piece.toLowerCase() !== 'n') return []

  const color = getPieceColor(piece)
  const moves: [number, number][] = []

  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1],
  ]

  for (const [dr, dc] of knightMoves) {
    const newRow = row + dr
    const newCol = col + dc

    if (isOnBoard(newRow, newCol)) {
      const target = board[newRow][newCol]
      if (!target || getPieceColor(target) !== color) {
        moves.push([newRow, newCol])
      }
    }
  }

  return moves
}

/**
 * Get valid moves for a rook
 */
export const getRookMoves = (
  row: number,
  col: number,
  board: Board
): [number, number][] => {
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  return getSlidingMoves(row, col, directions, board)
}

/**
 * Get valid moves for a bishop
 */
export const getBishopMoves = (
  row: number,
  col: number,
  board: Board
): [number, number][] => {
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
  return getSlidingMoves(row, col, directions, board)
}

/**
 * Get valid moves for a queen
 */
export const getQueenMoves = (
  row: number,
  col: number,
  board: Board
): [number, number][] => {
  const rookMoves = getRookMoves(row, col, board)
  const bishopMoves = getBishopMoves(row, col, board)
  return [...rookMoves, ...bishopMoves]
}

/**
 * Get valid moves for a king (excluding castling)
 */
export const getKingMoves = (
  row: number,
  col: number,
  board: Board
): [number, number][] => {
  const piece = board[row][col]
  if (!piece || piece.toLowerCase() !== 'k') return []

  const color = getPieceColor(piece)
  const moves: [number, number][] = []

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ]

  for (const [dr, dc] of directions) {
    const newRow = row + dr
    const newCol = col + dc

    if (isOnBoard(newRow, newCol)) {
      const target = board[newRow][newCol]
      if (!target || getPieceColor(target) !== color) {
        moves.push([newRow, newCol])
      }
    }
  }

  return moves
}

/**
 * Check if a square is under attack by the opponent
 */
export const isSquareUnderAttack = (
  row: number,
  col: number,
  board: Board,
  byWhite: boolean
): boolean => {
  // Check all opponent pieces for attacks
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c]
      if (!piece) continue

      const color = getPieceColor(piece)
      if (color === (byWhite ? 'white' : 'black')) continue // Wrong color

      const pieceLower = piece.toLowerCase()
      let canAttack = false

      if (pieceLower === 'p') {
        // Pawn attacks diagonally
        const direction = color === 'white' ? -1 : 1
        canAttack =
          r + direction === row && (c - 1 === col || c + 1 === col)
      } else if (pieceLower === 'n') {
        const moves = getKnightMoves(r, c, board)
        canAttack = moves.some(m => m[0] === row && m[1] === col)
      } else if (pieceLower === 'b') {
        const moves = getBishopMoves(r, c, board)
        canAttack = moves.some(m => m[0] === row && m[1] === col)
      } else if (pieceLower === 'r') {
        const moves = getRookMoves(r, c, board)
        canAttack = moves.some(m => m[0] === row && m[1] === col)
      } else if (pieceLower === 'q') {
        const moves = getQueenMoves(r, c, board)
        canAttack = moves.some(m => m[0] === row && m[1] === col)
      } else if (pieceLower === 'k') {
        const moves = getKingMoves(r, c, board)
        canAttack = moves.some(m => m[0] === row && m[1] === col)
      }

      if (canAttack) return true
    }
  }

  return false
}

/**
 * Find king position
 */
const findKing = (board: Board, isWhite: boolean): [number, number] | null => {
  const king = isWhite ? 'K' : 'k'
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === king) return [r, c]
    }
  }
  return null
}

/**
 * Check if king is in check
 */
export const isKingInCheck = (board: Board, isWhite: boolean): boolean => {
  const kingPos = findKing(board, isWhite)
  if (!kingPos) return false
  return isSquareUnderAttack(kingPos[0], kingPos[1], board, !isWhite)
}

/**
 * Check if a move would leave king in check
 */
export const doesMoveLeaveKingInCheck = (
  fromRow: number,
  fromCol: number,
  toRow: number,
  toCol: number,
  board: Board,
  isWhite: boolean
): boolean => {
  // Make the move on a copy
  const boardCopy = board.map(row => [...row])
  boardCopy[toRow][toCol] = boardCopy[fromRow][fromCol]
  boardCopy[fromRow][fromCol] = null

  // Check if king is in check
  return isKingInCheck(boardCopy, isWhite)
}

/**
 * Get all legal moves for a piece
 */
export const getLegalMoves = (
  row: number,
  col: number,
  board: Board,
  isWhite: boolean,
  enPassantTarget: [number, number] | null = null
): [number, number][] => {
  const piece = board[row][col]
  if (!piece || getPieceColor(piece) !== (isWhite ? 'white' : 'black')) {
    return []
  }

  const pieceLower = piece.toLowerCase()
  let moves: [number, number][] = []

  if (pieceLower === 'p') {
    moves = getPawnMoves(row, col, board, isWhite, enPassantTarget)
  } else if (pieceLower === 'n') {
    moves = getKnightMoves(row, col, board)
  } else if (pieceLower === 'b') {
    moves = getBishopMoves(row, col, board)
  } else if (pieceLower === 'r') {
    moves = getRookMoves(row, col, board)
  } else if (pieceLower === 'q') {
    moves = getQueenMoves(row, col, board)
  } else if (pieceLower === 'k') {
    moves = getKingMoves(row, col, board)
  }

  // Filter out moves that would leave king in check
  return moves.filter(
    ([toRow, toCol]) =>
      !doesMoveLeaveKingInCheck(row, col, toRow, toCol, board, isWhite)
  )
}

/**
 * Check if a side has any legal moves
 */
export const hasLegalMoves = (board: Board, isWhite: boolean): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (piece && getPieceColor(piece) === (isWhite ? 'white' : 'black')) {
        if (getLegalMoves(row, col, board, isWhite).length > 0) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * Check if current side is in checkmate
 */
export const isCheckmate = (board: Board, isWhite: boolean): boolean => {
  return (
    isKingInCheck(board, isWhite) && !hasLegalMoves(board, isWhite)
  )
}

/**
 * Check if current side is in stalemate
 */
export const isStalemate = (board: Board, isWhite: boolean): boolean => {
  return (
    !isKingInCheck(board, isWhite) && !hasLegalMoves(board, isWhite)
  )
}
