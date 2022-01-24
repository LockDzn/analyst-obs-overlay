import { Request, Response } from 'express'
import multer from 'multer'
import prisma from '../database/prisma'

export const TeamController = {
  async index(request: Request, response: Response) {
    return response.json({ message: 'Olá mundo.' })
  },

  async create(request: Request, response: Response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ message: 'Need field "name".' })
    }

    const newTeam = await prisma.team.create({
      data: {
        name: name,
        imageUrl: `${process.env.BASE_URL}/${request.file?.filename}`,
      },
    })

    return response
      .status(200)
      .json({ message: 'New team was created.', team: newTeam })
  },

  async list(request: Request, response: Response) {
    const teams = await prisma.team.findMany()
    return response.json(teams)
  },

  async delete(request: Request, response: Response) {
    const teamId = Number(request.params.id)

    if (!teamId) {
      return response.status(400).json({ message: 'invalid id.' })
    }

    const findTeam = await prisma.team.findUnique({ where: { id: teamId } })

    if (!findTeam) {
      return response.status(400).json({ message: 'this team doesnt exist.' })
    }

    const team = await prisma.team.delete({ where: { id: teamId } })

    return response
      .status(200)
      .json({ message: `team ${team.name} has been deleted` })
  },
}
