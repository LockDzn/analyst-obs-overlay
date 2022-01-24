import prisma from '../database/prisma'
import crypto from 'crypto'

interface TeamProps {
  id: number
  name: string
  imageURL: string
}

interface TeamInGameProps extends TeamProps {
  winPercentage: number
}

interface GameProps {
  id: number
  blue: TeamInGameProps
  red: TeamInGameProps
}

class GameManager {
  games = [] as GameProps[]

  find(gameId: number) {
    const game = this.games.find((game) => game.id == gameId)

    if (!game) {
      return null
    }

    return game
  }

  create(blueTeam: TeamInGameProps, redTeam: TeamInGameProps) {
    const gameId = crypto.randomInt(10000, 99999)

    const game = {
      id: gameId,
      blue: blueTeam,
      red: redTeam,
    }

    this.games.push(game)
    return game
  }

  remove(id: number) {
    this.games = this.games.filter((game) => game.id !== id)
  }

  update(gameId: number, blueTeam: TeamInGameProps, redTeam: TeamInGameProps) {
    for (let i = 0; i < this.games.length; i++) {
      const game = this.games[i]

      if (game.id == gameId) {
        game.blue = blueTeam
        game.red = redTeam
      }
    }

    return this.games
  }
}

export const gameManager = new GameManager()
