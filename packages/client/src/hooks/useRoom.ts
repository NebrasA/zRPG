import { useEffect, useState } from 'react'
import { Client, Room } from 'colyseus.js'
import { GameRoomState } from '@zrpg/shared'

const colyseusClient = new Client('ws://localhost:2567')

interface RoomState {
  room: Room<GameRoomState> | null
  state: GameRoomState | null
}

export function useRoom(): RoomState {
  const [room, setRoom] = useState<Room<GameRoomState> | null>(null)
  const [state, setState] = useState<GameRoomState | null>(null)

  useEffect(() => {
    let cancelled = false
    let joined: Room<GameRoomState> | null = null

    async function join() {
      const next = await colyseusClient.joinOrCreate<GameRoomState>('game_room')
      if (cancelled) {
        next.leave()
        return
      }
      joined = next
      setRoom(next)
      setState(next.state)

      next.onStateChange((newState) => {
        setState(Object.assign(Object.create(Object.getPrototypeOf(newState)), newState))
      })
    }

    join().catch(console.error)

    return () => {
      cancelled = true
      joined?.leave()
    }
  }, [])

  return { room, state }
}
