import { Schema, MapSchema, type } from '@colyseus/schema'

export class PlayerState extends Schema {
  @type('string') sessionId: string = ''
  @type('string') discordUserId: string = ''
  @type('boolean') ready: boolean = false
}

export class GameRoomState extends Schema {
  @type('string') phase: string = 'lobby'
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>()
}
