export enum GamePhase {
  Lobby = 'lobby',
  Exploring = 'exploring',
  Combat = 'combat',
}

export interface PlayerData {
  id: string
  discordUserId: string
  characterName: string
  level: number
  xp: number
}
