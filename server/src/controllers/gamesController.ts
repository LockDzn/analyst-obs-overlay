import { Request, Response } from 'express'
import prisma from '../database/prisma'
import { gameManager } from '../managers/gamesManager'

interface TeamRequestProps {
  id: number
  winPercentage: number
}

export const GamesController = {
  async index(request: Request, response: Response) {
    const games = gameManager.games
    return response.json(games)
  },

  async find(request: Request, response: Response) {
    const gameId = Number(request.params.id)

    const game = gameManager.find(gameId)

    if (!game) {
      return response
        .status(400)
        .json({ message: 'o games with that id were found' })
    }
    return response.status(200).json(game)
  },

  async create(request: Request, response: Response) {
    const blue = request.body.blueTeam as TeamRequestProps
    const red = request.body.redTeam as TeamRequestProps

    const blueTeam = await prisma.team.findUnique({
      where: {
        id: blue.id,
      },
    })

    if (!blueTeam) {
      return response
        .status(400)
        .json({ message: 'blueTeam fields are incorrect.' })
    }

    const redTeam = await prisma.team.findUnique({
      where: {
        id: red.id,
      },
    })

    if (!redTeam) {
      return response
        .status(400)
        .json({ message: 'redTeam fields are incorrect.' })
    }

    const blueInGame = {
      id: blueTeam.id,
      name: blueTeam.name,
      imageURL: blueTeam.imageUrl,
      winPercentage: blue.winPercentage,
    }

    const redInGame = {
      id: redTeam.id,
      name: redTeam.name,
      imageURL: redTeam.imageUrl,
      winPercentage: red.winPercentage,
    }

    const newGame = await gameManager.create(blueInGame, redInGame)

    return response
      .status(200)
      .json({ message: 'new game was created.', game: newGame })
  },

  async update(request: Request, response: Response) {
    const gameId = Number(request.params.id)
    const blue = request.body.blueTeam as TeamRequestProps
    const red = request.body.redTeam as TeamRequestProps

    if (!gameId) {
      return response.status(400).json({ message: 'missing game id' })
    }

    if (!gameManager.find(gameId)) {
      return response
        .status(400)
        .json({ message: 'no game was found with this id' })
    }

    const blueTeam = await prisma.team.findUnique({
      where: {
        id: blue.id,
      },
    })

    if (!blueTeam) {
      return response
        .status(400)
        .json({ message: 'blueTeam fields are incorrect.' })
    }

    const redTeam = await prisma.team.findUnique({
      where: {
        id: red.id,
      },
    })

    if (!redTeam) {
      return response
        .status(400)
        .json({ message: 'redTeam fields are incorrect.' })
    }

    const blueInGame = {
      id: blueTeam.id,
      name: blueTeam.name,
      imageURL: blueTeam.imageUrl,
      winPercentage: blue.winPercentage,
    }

    const redInGame = {
      id: redTeam.id,
      name: redTeam.name,
      imageURL: redTeam.imageUrl,
      winPercentage: red.winPercentage,
    }

    const updatedGame = await gameManager.update(gameId, blueInGame, redInGame)

    return response.json({
      message: 'game has been updated',
      game: updatedGame,
    })
  },
}
