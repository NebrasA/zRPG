import { GameRoomState } from '@zrpg/shared'
import { Room } from 'colyseus.js'

interface Props {
  room: Room<GameRoomState> | null
  state: GameRoomState | null
}

export function Lobby({ room, state }: Props) {
  if (!state) {
    return <p>Connecting...</p>
  }

  const players = Array.from(state.players.entries())

  function toggleReady() {
    room?.send('ready')
  }

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem' }}>
      <h1>zRPG</h1>
      <p>Phase: <strong>{state.phase}</strong></p>
      <h2>Players ({players.length} / 4)</h2>
      <ul>
        {players.map(([sessionId, player]) => (
          <li key={sessionId}>
            {sessionId.slice(0, 8)} — {player.ready ? '✓ ready' : 'waiting'}
          </li>
        ))}
      </ul>
      <button onClick={toggleReady}>Toggle Ready</button>
    </div>
  )
}
