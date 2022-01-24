import { gameManager } from '../managers/gamesManager'

test('create game', () => {
  const blueTeam = {
    id: 1,
    name: 'Team 1',
    imageURL: '',
    winPercentage: 50,
  }

  const redTeam = {
    id: 2,
    name: 'Team 2',
    imageURL: '',
    winPercentage: 50,
  }

  const newGame = gameManager.create(blueTeam, redTeam)
  const games = gameManager.games

  expect(games).toContain(newGame)
})

test('remove game', () => {
  const blueTeam = {
    id: 1,
    name: 'Team 1',
    imageURL: '',
    winPercentage: 50,
  }

  const redTeam = {
    id: 2,
    name: 'Team 2',
    imageURL: '',
    winPercentage: 50,
  }

  const newGame = gameManager.create(blueTeam, redTeam)
  gameManager.remove(newGame.id)
  const games = gameManager.games

  expect(games).not.toContain(newGame)
})

test('find game', () => {
  const blueTeam = {
    id: 1,
    name: 'Team 1',
    imageURL: '',
    winPercentage: 50,
  }

  const redTeam = {
    id: 2,
    name: 'Team 2',
    imageURL: '',
    winPercentage: 50,
  }

  const newGame = gameManager.create(blueTeam, redTeam)
  const findGame = gameManager.find(newGame.id)

  expect(findGame).toEqual(newGame)
})
