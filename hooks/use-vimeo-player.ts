"use client"

import { useState, useEffect, useRef } from "react"

interface VimeoPlayerOptions {
  videoId: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

interface VimeoPlayerState {
  isPlaying: boolean
  isMuted: boolean
  currentTime: number
  duration: number
  progress: number
  volume: number
  isBuffering: boolean
  isFullscreen: boolean
}

export function useVimeoPlayer({ videoId, autoplay = false, muted = true, loop = true }: VimeoPlayerOptions) {
  const [playerState, setPlayerState] = useState<VimeoPlayerState>({
    isPlaying: autoplay,
    isMuted: muted,
    currentTime: 0,
    duration: 0,
    progress: 0,
    volume: muted ? 0 : 0.8,
    isBuffering: false,
    isFullscreen: false,
  })

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<any>(null)

  // Inicializar o player quando o iframe estiver pronto
  useEffect(() => {
    if (!iframeRef.current) return

    // Função para lidar com mensagens da API do Vimeo
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data)

        // Atualizar estado com base nas mensagens do player
        if (data.event === "ready") {
          console.log("Vimeo player ready")
        } else if (data.event === "play") {
          setPlayerState((prev) => ({ ...prev, isPlaying: true }))
        } else if (data.event === "pause") {
          setPlayerState((prev) => ({ ...prev, isPlaying: false }))
        } else if (data.event === "timeupdate") {
          const { seconds, percent, duration } = data.data
          setPlayerState((prev) => ({
            ...prev,
            currentTime: seconds,
            progress: percent * 100,
            duration,
          }))
        } else if (data.event === "volumechange") {
          const { volume } = data.data
          setPlayerState((prev) => ({
            ...prev,
            volume,
            isMuted: volume === 0,
          }))
        } else if (data.event === "bufferstart") {
          setPlayerState((prev) => ({ ...prev, isBuffering: true }))
        } else if (data.event === "bufferend") {
          setPlayerState((prev) => ({ ...prev, isBuffering: false }))
        }
      } catch (error) {
        // Ignorar mensagens que não são JSON
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  // Funções para controlar o player
  const play = () => {
    if (!iframeRef.current) return

    const message = {
      method: "play",
    }

    iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), "*")
    setPlayerState((prev) => ({ ...prev, isPlaying: true }))
  }

  const pause = () => {
    if (!iframeRef.current) return

    const message = {
      method: "pause",
    }

    iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), "*")
    setPlayerState((prev) => ({ ...prev, isPlaying: false }))
  }

  const togglePlay = () => {
    if (playerState.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const setMuted = (muted: boolean) => {
    if (!iframeRef.current) return

    const message = {
      method: "setVolume",
      value: muted ? "0" : playerState.volume.toString(),
    }

    iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), "*")
    setPlayerState((prev) => ({ ...prev, isMuted: muted }))
  }

  const toggleMute = () => {
    setMuted(!playerState.isMuted)
  }

  const seekTo = (seconds: number) => {
    if (!iframeRef.current) return

    const message = {
      method: "setCurrentTime",
      value: seconds.toString(),
    }

    iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), "*")
  }

  const setVolume = (volume: number) => {
    if (!iframeRef.current) return

    // Garantir que o volume esteja entre 0 e 1
    const safeVolume = Math.max(0, Math.min(1, volume))

    const message = {
      method: "setVolume",
      value: safeVolume.toString(),
    }

    iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), "*")
    setPlayerState((prev) => ({
      ...prev,
      volume: safeVolume,
      isMuted: safeVolume === 0,
    }))
  }

  // Construir a URL do iframe
  const getIframeSrc = () => {
    const params = new URLSearchParams({
      h: "628df636e2",
      badge: "0",
      autopause: "0",
      player_id: "0",
      app_id: "58479",
      autoplay: autoplay ? "1" : "0",
      loop: loop ? "1" : "0",
      muted: muted ? "1" : "0",
      title: "0",
      byline: "0",
      portrait: "0",
      controls: "0",
      transparent: "1",
      dnt: "1",
    })

    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`
  }

  return {
    playerState,
    iframeRef,
    playerRef,
    play,
    pause,
    togglePlay,
    setMuted,
    toggleMute,
    seekTo,
    setVolume,
    getIframeSrc,
  }
}
