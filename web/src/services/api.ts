import axios from 'axios'

export interface TeamProps {
  id: number
  name: string
  imageUrl: string
}

export interface GameProps {
  id: number
  blue: {
    id: number
    name: string
    imageURL: string
    winPercentage: number
  }
  red: {
    id: number
    name: string
    imageURL: string
    winPercentage: number
  }
}

export interface CreateGameProps {
  blueTeam: {
    id: number
    winPercentage: number
  }
  redTeam: {
    id: number
    winPercentage: number
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

const apiTeam = {
  async list() {
    const response = await api.get('/teams')
    const teams = response.data as TeamProps[]

    return teams
  },

  async delete(id: number) {
    try {
      const response = await api.delete(`/team/${id}`)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  },

  async create(data: FormData) {
    try {
      const response = await api.post(`/team`, data)
      return response.data.team
    } catch (err) {
      console.error(err)
      return null
    }
  },
}

const apiGame = {
  async list() {
    const response = await api.get('/games')
    const games = response.data as GameProps[]
    return games
  },

  async find(id: number) {
    try {
      const response = await api.get(`/game/${id}`)
      const game = response.data as GameProps
      return game
    } catch (err) {
      console.error(err)
      return null
    }
  },

  async create({ blueTeam, redTeam }: CreateGameProps) {
    try {
      const response = await api.post('/game', {
        blueTeam,
        redTeam,
      })

      return response.data.game as GameProps
    } catch (err) {
      console.error(err)
      return null
    }
  },

  async update({ gameId, data }: { gameId: number; data: CreateGameProps }) {
    try {
      const response = await api.put(`/game/${gameId}`, {
        data,
      })

      return response.data.game as GameProps
    } catch (err) {
      console.error(err)
      return null
    }
  },
}

export { api, apiTeam, apiGame }
