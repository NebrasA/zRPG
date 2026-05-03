import { useEffect, useState } from 'react'
import { DiscordSDK, DiscordSDKMock } from '@discord/embedded-app-sdk'
import type { IDiscordSDK } from '@discord/embedded-app-sdk'

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID ?? ''

const isInsideDiscord = new URLSearchParams(window.location.search).has('frame_id')

const discordSdk: IDiscordSDK = isInsideDiscord
  ? new DiscordSDK(clientId)
  : new DiscordSDKMock(clientId, null, null, null)

type Auth = Awaited<ReturnType<DiscordSDK['commands']['authenticate']>>

interface DiscordState {
  sdk: IDiscordSDK
  auth: Auth | null
  ready: boolean
}

export function useDiscord(): DiscordState {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function init() {
      await discordSdk.ready()
      setReady(true)
      // Full OAuth token exchange is wired up in a later phase.
    }
    init().catch(console.error)
  }, [])

  return { sdk: discordSdk, auth, ready }
}
