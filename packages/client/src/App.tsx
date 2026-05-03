import { useDiscord } from './hooks/useDiscord'
import { useRoom } from './hooks/useRoom'
import { Lobby } from './components/Lobby'

export function App() {
  const { ready: discordReady } = useDiscord()
  const { room, state } = useRoom()

  if (!discordReady) {
    return <p style={{ fontFamily: 'monospace', padding: '2rem' }}>Initialising Discord SDK...</p>
  }

  return <Lobby room={room} state={state} />
}
