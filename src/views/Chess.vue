<script setup lang="ts">
import { ref, computed } from 'vue'

type Piece = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null
type Board = Piece[][]

// Initialize chess board with starting position
const initializeBoard = (): Board => {
  const board: Board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]
  return board
}

const board = ref<Board>(initializeBoard())
const selectedSquare = ref<[number, number] | null>(null)
const validMoves = ref<[number, number][]>([])

const getPieceUnicode = (piece: Piece): string => {
  const pieceMap: Record<string, string> = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  }
  return piece ? pieceMap[piece] || '' : ''
}

const getPieceColor = (piece: Piece): string => {
  if (!piece) return ''
  return piece === piece.toUpperCase() ? 'white' : 'black'
}

const getSquareColor = (row: number, col: number): string => {
  const isLight = (row + col) % 2 === 0
  return isLight ? '#f0d9b5' : '#baca44'
}

const isSquareSelected = (row: number, col: number): boolean => {
  return selectedSquare.value !== null && selectedSquare.value[0] === row && selectedSquare.value[1] === col
}

const isValidMove = (row: number, col: number): boolean => {
  return validMoves.value.some(move => move[0] === row && move[1] === col)
}

const resetBoard = () => {
  board.value = initializeBoard()
  selectedSquare.value = null
  validMoves.value = []
}

const selectSquare = (row: number, col: number) => {
  // If clicking on a valid move, make the move
  if (isValidMove(row, col) && selectedSquare.value) {
    const [fromRow, fromCol] = selectedSquare.value
    board.value[row][col] = board.value[fromRow][fromCol]
    board.value[fromRow][fromCol] = null
    selectedSquare.value = null
    validMoves.value = []
    return
  }

  // If clicking on a piece, select it
  if (board.value[row][col]) {
    selectedSquare.value = [row, col]
    // For now, show all surrounding squares as valid moves
    validMoves.value = getSimpleValidMoves(row, col)
  } else {
    selectedSquare.value = null
    validMoves.value = []
  }
}

const getSimpleValidMoves = (row: number, col: number): [number, number][] => {
  const moves: [number, number][] = []
  const piece = board.value[row][col]
  if (!piece) return moves

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ]

  directions.forEach(([dr, dc]) => {
    const newRow = row + dr
    const newCol = col + dc
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const targetPiece = board.value[newRow][newCol]
      // Can move to empty square or capture opponent piece
      if (!targetPiece || getPieceColor(piece) !== getPieceColor(targetPiece)) {
        moves.push([newRow, newCol])
      }
    }
  })

  return moves
}

const fileLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const rankLabels = ['8', '7', '6', '5', '4', '3', '2', '1']
</script>

<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Chess Board Card -->
        <v-card class="elevation-8" style="border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 2rem; border-radius: 16px 16px 0 0;">
            <v-card-title class="text-white text-h4 font-weight-bold">
              <v-icon size="large" class="mr-3">mdi-chess-board</v-icon>
              Chess Game
            </v-card-title>
          </div>
          <v-card-text class="pa-8">
            <!-- Chess Board -->
            <div class="chess-container mb-6">
              <div class="rank-labels">
                <div v-for="rank in rankLabels" :key="rank" class="rank-label">{{ rank }}</div>
              </div>
              <div class="board-wrapper">
                <div class="chess-board">
                  <div
                    v-for="(row, rowIndex) in board"
                    :key="rowIndex"
                    class="chess-row"
                  >
                    <div
                      v-for="(piece, colIndex) in row"
                      :key="`${rowIndex}-${colIndex}`"
                      class="chess-square"
                      :style="{
                        backgroundColor: getSquareColor(rowIndex, colIndex),
                        border: isSquareSelected(rowIndex, colIndex) ? '3px solid #ff6b6b' : 'none',
                        boxShadow: isValidMove(rowIndex, colIndex) ? 'inset 0 0 10px rgba(76, 175, 80, 0.5)' : 'none',
                      }"
                      @click="selectSquare(rowIndex, colIndex)"
                    >
                      <span class="piece" :class="{ 'piece-white': getPieceColor(piece) === 'white' }">
                        {{ getPieceUnicode(piece) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="file-labels">
                  <div v-for="file in fileLabels" :key="file" class="file-label">{{ file }}</div>
                </div>
              </div>
            </div>

            <!-- Game Info -->
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4" style="border-left: 4px solid #8b5cf6;">
                  <p class="text-subtitle2 font-weight-bold mb-2">
                    <v-icon small>mdi-information</v-icon>
                    How to Play
                  </p>
                  <p class="text-caption">
                    Click on a piece to select it. Valid moves will be highlighted. Click on a highlighted square to move the piece. Click the board to deselect.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4" style="border-left: 4px solid #ec4899;">
                  <p class="text-subtitle2 font-weight-bold mb-2">
                    <v-icon small>mdi-chess-king</v-icon>
                    Pieces
                  </p>
                  <p class="text-caption">
                    ♔♕♖♗♘♙ (White) vs ♚♛♜♝♞♟ (Black)
                  </p>
                </v-card>
              </v-col>
            </v-row>

            <!-- Reset Button -->
            <v-btn
              @click="resetBoard"
              color="secondary"
              block
              size="large"
              class="rounded-lg"
            >
              <v-icon class="mr-2">mdi-reload</v-icon>
              Reset Board
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.chess-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.rank-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  text-align: right;
  padding-right: 0.5rem;
  font-weight: bold;
  color: #333;
}

.rank-label {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.chess-board {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 3px solid #333;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.chess-row {
  display: flex;
  gap: 0;
}

.chess-square {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.chess-square:hover {
  filter: brightness(0.95);
}

.piece {
  font-size: 40px;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.piece-white {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.file-labels {
  display: flex;
  justify-content: space-around;
  padding-left: 0;
  gap: 0;
}

.file-label {
  width: 50px;
  text-align: center;
  font-weight: bold;
  color: #333;
}

@media (max-width: 600px) {
  .chess-square {
    width: 40px;
    height: 40px;
  }

  .piece {
    font-size: 30px;
  }

  .file-label {
    width: 40px;
  }

  .rank-label {
    height: 40px;
  }
}
</style>
