import express from 'express'
import { createServer } from 'http'
import { Server } from 'colyseus'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { GameRoom } from './rooms/GameRoom'

const app = express()
const httpServer = createServer(app)

const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
})

gameServer.define('game_room', GameRoom)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const PORT = Number(process.env.PORT) || 2567

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
