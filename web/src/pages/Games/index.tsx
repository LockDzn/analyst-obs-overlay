import React, { useEffect, useState } from 'react'
import { apiGame, apiTeam, TeamProps, GameProps } from '../../services/api'

import Tab from '../../components/Tab'

import './styles.scss'

function Games() {
  const [games, setGames] = useState<GameProps[]>([])
  const [teams, setTeams] = useState<TeamProps[]>([])

  const [blueTeamString, setBlueTeamString] = useState('1')
  const [redTeamString, setRedTeamString] = useState('2')

  const [blueTeamPercentage, setBlueTeamPercentage] = useState(50)
  const [redTeamPercentage, setRedTeamPercentage] = useState(50)

  const [blueTeam, setBlueTeam] = useState<TeamProps | null>(null)
  const [redTeam, setRedTeam] = useState<TeamProps | null>(null)

  useEffect(() => {
    apiTeam.list().then((dataTeams) => {
      setTeams(dataTeams)
    })

    apiGame.list().then((dataGames) => [setGames(dataGames)])
  }, [])

  useEffect(() => {
    const blueTeamData = teams.find((team) => team.id == Number(blueTeamString))
    const redTeamData = teams.find((team) => team.id == Number(redTeamString))

    if (blueTeamData) {
      setBlueTeam(blueTeamData)
    } else {
      setBlueTeam(null)
    }

    if (redTeamData) {
      setRedTeam(redTeamData)
    } else {
      setRedTeam(null)
    }
  }, [blueTeamString, redTeamString])

  async function hasCreateGame(event: React.FormEvent) {
    event.preventDefault()

    if (!blueTeam || !redTeam) {
      return
    }

    const data = {
      blueTeam: {
        id: blueTeam.id,
        winPercentage: blueTeamPercentage,
      },
      redTeam: {
        id: redTeam.id,
        winPercentage: redTeamPercentage,
      },
    }

    const newGame = await apiGame.create(data)
    if (!newGame) return alert('Não foi possivel criar esse game.')
  }

  return (
    <div className="games">
      <Tab title="Games">
        <div className="gamesList">
          <ul>
            {games.map((game) => (
              <li className="game">
                <div className="team">
                  <span>{game.blue.winPercentage}%</span>
                  <img src={game.blue.imageURL} alt={game.blue.name} />
                  <span>{game.blue.name}</span>
                </div>
                <div className="versus">X</div>
                <div className="team">
                  <span>{game.red.name}</span>
                  <img src={game.red.imageURL} alt={game.red.name} />
                  <span>{game.red.winPercentage}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Tab>
      <Tab title="Criar game">
        <div className="createGame">
          <form onSubmit={hasCreateGame}>
            <div className="team">
              <div className="field">
                {blueTeam && (
                  <img src={blueTeam.imageUrl} alt={blueTeam.name} />
                )}

                <label htmlFor="">Time Azul</label>
                <select
                  name="blueTeam"
                  id="blueTeam"
                  onChange={(event) => setBlueTeamString(event.target.value)}
                  value={blueTeamString}
                >
                  {teams.map((team) => (
                    <option value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="bluePercentage">Porcentagem de vitória:</label>
                <span className="percentage">
                  <input
                    type="number"
                    id="bluePercentage"
                    min="0"
                    max="100"
                    value={blueTeamPercentage}
                    onChange={(event) =>
                      setBlueTeamPercentage(Number(event.target.value))
                    }
                  />
                  %
                </span>
              </div>
            </div>
            <div className="versus">X</div>
            <div className="team">
              <div className="field">
                {redTeam && <img src={redTeam.imageUrl} alt={redTeam.name} />}
                <label htmlFor="">Time Vermelho</label>
                <select
                  name="redTeam"
                  id="redTeam"
                  onChange={(event) => setRedTeamString(event.target.value)}
                  value={redTeamString}
                >
                  {teams.map((team) => (
                    <option value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="redPercentage">Porcentagem de vitória:</label>
                <span className="percentage">
                  <input
                    type="number"
                    id="redPercentage"
                    min="0"
                    max="100"
                    value={redTeamPercentage}
                    onChange={(event) =>
                      setRedTeamPercentage(Number(event.target.value))
                    }
                  />
                  %
                </span>
              </div>
            </div>
            <div className="actions">
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </Tab>
    </div>
  )
}

export default Games
