import { useEffect, useState } from 'react'

import { apiGame, GameProps } from '../../../services/api'

import './styles.scss'

function Games() {
  const [games, setGames] = useState<GameProps[]>([])

  useEffect(() => {
    apiGame.list().then((dataGames) => {
      setGames(dataGames)
    })
    const interval = setInterval(() => {
      apiGame.list().then((dataGames) => {
        setGames(dataGames)
      })
      console.log('ok')
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="games">
      <ul>
        {games.map((game) => (
          <li>
            <div className="team">
              <span className="percentage">{game.blue.winPercentage}%</span>
              <img src={game.blue.imageURL} alt={game.blue.name} />
            </div>
            <div className="versus">X</div>
            <div className="team">
              <img src={game.red.imageURL} alt={game.red.name} />
              <span className="percentage">{game.red.winPercentage}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
