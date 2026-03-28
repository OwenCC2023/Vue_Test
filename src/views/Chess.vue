<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Piece,
  Board,
  getPieceColor,
  getLegalMoves,
  isKingInCheck,
  isCheckmate,
  isStalemate,
} from '../utils/chess'

// Initialize chess board with starting position
const initializeBoard = (): Board => {
  return [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]
}

const board = ref<Board>(initializeBoard())
const selectedSquare = ref<[number, number] | null>(null)
const validMoves = ref<[number, number][]>([])
const isWhiteTurn = ref(true)
const moveHistory = ref<string[]>([])

const gameStatus = computed(() => {
  const inCheck = isKingInCheck(board.value, isWhiteTurn.value)
  const isMate = isCheckmate(board.value, isWhiteTurn.value)
  const isStaleMate = isStalemate(board.value, isWhiteTurn.value)

  if (isMate) {
    return isWhiteTurn.value ? 'Black wins! Checkmate' : 'White wins! Checkmate'
  }
  if (isStaleMate) {
    return 'Draw! Stalemate'
  }
  if (inCheck) {
    return 'Check!'
  }
  return null
})

const gameOver = computed(() => {
  return isCheckmate(board.value, isWhiteTurn.value) ||
    isStalemate(board.value, isWhiteTurn.value)
})

const getPieceUnicode = (piece: Piece): string => {
  const pieceMap: Record<string, string> = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
  }
  return piece ? pieceMap[piece] || '' : ''
}

const getSquareColor = (row: number, col: number): string => {
  const isLight = (row + col) % 2 === 0
  return isLight ? '#f0d9b5' : '#baca44'
}

const isSquareSelected = (row: number, col: number): boolean => {
  return selectedSquare.value !== null &&
    selectedSquare.value[0] === row &&
    selectedSquare.value[1] === col
}

const isValidMove = (row: number, col: number): boolean => {
  return validMoves.value.some(move => move[0] === row && move[1] === col)
}

const resetBoard = () => {
  board.value = initializeBoard()
  selectedSquare.value = null
  validMoves.value = []
  isWhiteTurn.value = true
  moveHistory.value = []
}

const makeMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
  const piece = board.value[fromRow][fromCol]
  const captured = board.value[toRow][toCol]

  // Handle pawn promotion
  if (piece && piece.toLowerCase() === 'p') {
    if ((piece === 'P' && toRow === 7) || (piece === 'p' && toRow === 0)) {
      board.value[toRow][toCol] = piece === 'P' ? 'Q' : 'q'
      board.value[fromRow][fromCol] = null
    } else {
      board.value[toRow][toCol] = piece
      board.value[fromRow][fromCol] = null
    }
  } else {
    board.value[toRow][toCol] = piece
    board.value[fromRow][fromCol] = null
  }

  // Record move
  const fromSquare = String.fromCharCode(97 + fromCol) + (8 - fromRow)
  const toSquare = String.fromCharCode(97 + toCol) + (8 - toRow)
  const notation = `${piece}${captured ? 'x' : ''}${toSquare}`
  moveHistory.value.push(notation)

  // Switch turns
  isWhiteTurn.value = !isWhiteTurn.value
  selectedSquare.value = null
  validMoves.value = []
}

const selectSquare = (row: number, col: number) => {
  if (gameOver.value) return

  // If clicking on a valid move, make the move
  if (isValidMove(row, col) && selectedSquare.value) {
    const [fromRow, fromCol] = selectedSquare.value
    makeMove(fromRow, fromCol, row, col)
    return
  }

  // If clicking on own piece, select it
  const piece = board.value[row][col]
  if (piece && getPieceColor(piece) === (isWhiteTurn.value ? 'white' : 'black')) {
    selectedSquare.value = [row, col]
    validMoves.value = getLegalMoves(row, col, board.value, isWhiteTurn.value)
  } else {
    selectedSquare.value = null
    validMoves.value = []
  }
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
            <!-- Game Status -->
            <div class="mb-6">
              <v-alert
                v-if="gameStatus === 'Check!'"
                color="warning"
                icon="mdi-alert"
                title="Check!"
                text="Your king is under attack!"
                class="mb-4"
              ></v-alert>
              <v-alert
                v-else-if="gameStatus && gameStatus.includes('wins')"
                color="success"
                icon="mdi-trophy"
                :title="gameStatus"
                class="mb-4"
              ></v-alert>
              <v-alert
                v-else-if="gameStatus === 'Draw! Stalemate'"
                color="info"
                icon="mdi-handshake"
                title="Draw!"
                text="The game is a draw by stalemate."
                class="mb-4"
              ></v-alert>

              <v-card class="pa-4 mb-4" :style="{ 'border-left': isWhiteTurn ? '4px solid #f0d9b5' : '4px solid #333' }">
                <p class="text-subtitle2 font-weight-bold mb-0">
                  <v-icon small>{{ isWhiteTurn ? 'mdi-chess-white' : 'mdi-chess-black' }}</v-icon>
                  {{ isWhiteTurn ? 'White' : 'Black' }}'s Turn
                </p>
              </v-card>
            </div>

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
                        boxShadow: isValidMove(rowIndex, colIndex) ? 'inset 0 0 12px rgba(76, 175, 80, 0.6)' : 'none',
                        cursor: !gameOver ? 'pointer' : 'not-allowed',
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

            <!-- Move History -->
            <v-card class="pa-4 mb-4" style="background: #f5f5f5;">
              <p class="text-subtitle2 font-weight-bold mb-2">
                <v-icon small>mdi-history</v-icon>
                Moves
              </p>
              <div v-if="moveHistory.length > 0" class="move-history">
                <span v-for="(move, index) in moveHistory" :key="index" class="move-item">
                  {{ index + 1 }}. {{ move }}
                </span>
              </div>
              <p v-else class="text-caption text-grey">No moves yet</p>
            </v-card>

            <!-- Game Info -->
            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-card class="pa-4" style="border-left: 4px solid #8b5cf6;">
                  <p class="text-subtitle2 font-weight-bold mb-2">
                    <v-icon small>mdi-information</v-icon>
                    How to Play
                  </p>
                  <p class="text-caption">
                    Click on a piece to select it. Green squares show legal moves. Click on a highlighted square to move. Standard chess rules apply!
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-4" style="border-left: 4px solid #ec4899;">
                  <p class="text-subtitle2 font-weight-bold mb-2">
                    <v-icon small>mdi-chess-king</v-icon>
                    Rules
                  </p>
                  <p class="text-caption">
                    Each piece moves according to standard chess rules. Cannot move into or leave your king in check. Checkmate ends the game!
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
  user-select: none;
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

.move-history {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.move-item {
  display: inline-block;
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
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
