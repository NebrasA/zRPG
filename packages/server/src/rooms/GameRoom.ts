import { Room, Client } from 'colyseus'
import { GameRoomState, PlayerState } from '@zrpg/shared'
import { prisma } from '../db'

export class GameRoom extends Room<GameRoomState> {
  maxClients = 4

  onCreate() {
    this.setState(new GameRoomState())

    this.onMessage('ready', (client) => {
      const player = this.state.players.get(client.sessionId)
      if (player) player.ready = !player.ready
    })
  }

  async onJoin(client: Client) {
    const player = new PlayerState()
    player.sessionId = client.sessionId
    player.discordUserId = client.sessionId // placeholder until real Discord auth
    this.state.players.set(client.sessionId, player)

    await prisma.player.upsert({
      where: { discordUserId: client.sessionId },
      update: {},
      create: { discordUserId: client.sessionId },
    })
  }

  onLeave(client: Client) {
    this.state.players.delete(client.sessionId)
  }

  onDispose() {
    console.log('GameRoom disposed')
  }
}
