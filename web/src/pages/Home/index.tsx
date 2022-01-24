import { useEffect, useState } from 'react'
import Tab from '../../components/Tab'
import { api, apiTeam, TeamProps } from '../../services/api'

import './styles.scss'

function Home() {
  const [teams, setTeams] = useState<TeamProps[]>([])

  const [teamName, setTeamName] = useState('')
  const [teamLogoFile, setTeamLogoFile] = useState<File | undefined>()

  useEffect(() => {
    apiTeam.list().then((dataTeams) => {
      setTeams(dataTeams)
    })
  }, [])

  async function createTeam(event: React.FormEvent) {
    event.preventDefault()

    if (!teamLogoFile) return

    const data = new FormData()

    data.append('logo', teamLogoFile, teamLogoFile.name)
    data.append('name', teamName)

    const newTeam = await apiTeam.create(data)

    if (newTeam) {
      setTeams((oldTeams) => [...oldTeams, newTeam])
    }
  }

  function onChangeTeamLogo(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      setTeamLogoFile(undefined)
      return
    }

    setTeamLogoFile(event.target.files[0])
  }

  async function deleteTeam(id: number) {
    const hasDeleted = await apiTeam.delete(id)

    if (hasDeleted) {
      const newTeams = teams.filter((team) => team.id !== id)
      setTeams(newTeams)
    }
  }

  return (
    <div className="home">
      <Tab title="Times">
        <div className="teamList">
          <ul>
            {teams.map((team) => (
              <li key={team.id}>
                <div className="info">
                  <img src={team.imageUrl} alt={team.name} />
                  <div className="name">{team.name}</div>
                </div>
                <div className="actions">
                  <button
                    className="delete"
                    onClick={() => deleteTeam(team.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Tab>

      <Tab title="Criar time">
        <div className="createTeam">
          <form onSubmit={createTeam}>
            <div className="field">
              <label htmlFor="teamName">Nome do time:</label>
              <input
                type="text"
                id="teamName"
                className="teamName"
                placeholder="Nome do time"
                onChange={(event) => setTeamName(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="teamLogo">Logo do time:</label>
              <input
                type="file"
                id="teamlogo"
                className="teamLogo"
                onChange={onChangeTeamLogo}
              />
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

export default Home
