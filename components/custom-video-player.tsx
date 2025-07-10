"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Loader } from "lucide-react"
import { useVimeoPlayer } from "@/hooks/use-vimeo-player"
import "@/styles/video-player.css"

interface CustomVideoPlayerProps {
  videoId: string
  autoPlayDelay?: number
}

export default function CustomVideoPlayer({ videoId, autoPlayDelay = 4000 }: CustomVideoPlayerProps) {
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const { playerState, iframeRef, play, pause, togglePlay, toggleMute, seekTo, setVolume, getIframeSrc } =
    useVimeoPlayer({
      videoId,
      autoplay: false,
      muted: true,
      loop: true,
    })

  const { isPlaying, isMuted, currentTime, duration, progress, volume, isBuffering } = playerState

  // Formatar tempo em MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Iniciar o vídeo após o delay
  useEffect(() => {
    const timer = setTimeout(() => {
      play()
      setVolume(0.8) // Definir volume para 80%
    }, autoPlayDelay)

    return () => clearTimeout(timer)
  }, [autoPlayDelay])

  // Esconder controles após inatividade
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const playerContainer = playerContainerRef.current
    if (playerContainer) {
      playerContainer.addEventListener("mousemove", handleMouseMove)
      playerContainer.addEventListener("touchstart", handleMouseMove)
    }

    return () => {
      if (playerContainer) {
        playerContainer.removeEventListener("mousemove", handleMouseMove)
        playerContainer.removeEventListener("touchstart", handleMouseMove)
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  // Função para buscar uma posição específica no vídeo
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (Number.parseFloat(e.target.value) / 100) * duration
    seekTo(newTime)
  }

  // Função para alterar o volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value) / 100
    setVolume(newVolume)
  }

  // Função para obter o ícone de volume apropriado
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  // Estilos personalizados para a barra de progresso
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
    .video-progress {
      -webkit-appearance: none;
      appearance: none;
      height: 6px;
      border-radius: 3px;
      outline: none;
      transition: all 0.2s ease;
    }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-600/50 transition-all duration-300 hover:border-orange-500/50 player-container">
      <div ref={playerContainerRef} className="aspect-[9/16] w-full relative cursor-pointer" onClick={togglePlay}>
        {/* Iframe do Vimeo sem controles nativos */}
        <div style={{ padding: "177.78% 0 0 0", position: "relative" }}>
          <iframe
            ref={iframeRef}
            src={getIframeSrc()}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title="Game Stick Pro 4K - 20.000+ JOGOS RETRO"
          />
        </div>

        {/* Overlay para controles personalizados */}
        <div
          className={`absolute inset-0 transition-all duration-400 ${
            showControls ? "opacity-100 controls-fade-in" : "opacity-0 controls-fade-out"
          }`}
        >
          {/* Botão central de play/pause */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isBuffering ? (
              <div className="buffer-indicator">
                <Loader className="w-8 h-8 md:w-10 md:h-10 text-orange-500 animate-spin" />
              </div>
            ) : (
              !isPlaying && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                  className="main-play-button"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                </button>
              )
            )}
          </div>

          {/* Controles inferiores */}
          <div className="absolute bottom-0 left-0 right-0 video-controls-bar">
            {/* Barra de progresso */}
            <div className="mb-4 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="video-progress w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${progress}%, rgba(255,255,255,0.3) ${progress}%, rgba(255,255,255,0.3) 100%)`,
                }}
                aria-label="Controle de progresso do vídeo"
              />
            </div>

            {/* Botões de controle */}
            <div className="flex items-center justify-between">
              {/* Controles principais */}
              <div className="controls-group">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                  className="video-control-button"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              </div>

              {/* Controles de volume e tela cheia */}
              <div className="flex items-center gap-3">
                {/* Container de volume */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                  className="video-control-button !w-8 !h-8"
                  aria-label={isMuted ? "Ativar som" : "Desativar som"}
                >
                  <VolumeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
