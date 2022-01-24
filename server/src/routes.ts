import express from 'express'
import multer from 'multer'
import path from 'path'

import { GamesController } from './controllers/gamesController'
import { TeamController } from './controllers/teamController'

const routes = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  },
})

const upload = multer({ storage: storage })

routes.get('/', TeamController.index)
routes.post('/team', upload.single('logo'), TeamController.create)
routes.get('/teams', TeamController.list)
routes.delete('/team/:id', TeamController.delete)

routes.get('/games', GamesController.index)
routes.get('/game/:id', GamesController.find)
routes.post('/game', GamesController.create)
routes.put('/game/:id', GamesController.update)

export default routes
