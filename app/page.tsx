"use client"

import { useEffect, memo, lazy } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// Lazy load do componente de vídeo para melhor performance
const CustomVideoPlayer = lazy(() => import("@/components/custom-video-player"))

// Memoizar componentes que não mudam frequentemente
const FeatureCard = memo(({ feature, index, isVisible }: { feature: any; index: number; isVisible: boolean }) => (
  <Card
    className={`bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-orange-500/20 transform hover:-translate-y-1 shadow-xl rounded-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <CardContent className="p-6 text-center">
      <div className="p-3 bg-orange-500/10 rounded-full inline-block mb-4">
        <feature.icon className="w-8 h-8 text-orange-400" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-300 text-sm">{feature.description}</p>
    </CardContent>
  </Card>
))

const GameCard = memo(({ game, index }: { game: any; index: number }) => (
  <div className="min-w-[280px] md:min-w-[320px] snap-start">
    <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl h-full rounded-xl overflow-hidden">
      <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-t-lg">
        <Image
          src={game.image || "/placeholder.svg"}
          alt={game.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 280px, 320px"
          loading={index < 3 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAAcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <Badge variant="secondary" className="bg-orange-500/80 text-white border-none">
            {game.platform}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-bold text-lg mb-1">{game.name}</h3>
        <p className="text-orange-300 text-xs mb-2">{game.year}</p>
        <p className="text-gray-300 text-sm">{game.description}</p>
      </CardContent>
    </Card>
  </div>
))

const TestimonialCard = memo(({ testimonial }: { testimonial: any }) => (
  <div className="min-w-[300px] md:min-w-[350px] snap-start">
    <Card className="bg-gray-800/70 backdrop-blur-lg border-gray-700 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl h-full rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden mb-4 bg-black group cursor-pointer border border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black flex flex-col items-center justify-center p-4">
            <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-orange-400 shadow-lg">
              <Image
                src={testimonial.photo || "/placeholder.svg"}
                alt={testimonial.customerName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2 text-center px-4">{testimonial.customerName}</h4>
            <p className="text-gray-300 text-sm mb-4">{testimonial.location}</p>
            <div className="relative">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 group-hover:scale-110 transition-all duration-300 group-hover:shadow-orange-500/60">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-16 h-16 bg-orange-500/30 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-300 text-xs mt-4 text-center px-4 group-hover:text-white transition-colors">
              Clique para assistir o depoimento
            </p>
          </div>
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none transition-opacity duration-500"
            controls
            preload="none"
            onLoadedData={(e) => {
              const video = e.target as HTMLVideoElement
              video.currentTime = 1
            }}
          >
            <source src={testimonial.videoSrc} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500/90 text-white border-none text-xs backdrop-blur-sm">✓ Depoimento Real</Badge>
          </div>
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const container = e.currentTarget.parentElement
              const preview = container?.querySelector(".absolute.inset-0.bg-gradient-to-br") as HTMLElement
              const video = container?.querySelector("video") as HTMLVideoElement

              if (preview && video) {
                preview.style.opacity = "0"
                preview.style.pointerEvents = "none"
                video.style.opacity = "1"
                video.style.pointerEvents = "auto"
                video.play()

                video.onended = () => {
                  preview.style.opacity = "1"
                  preview.style.pointerEvents = "auto"
                  video.style.opacity = "0"
                  video.style.pointerEvents = "none"
                  video.currentTime = 0
                }

                video.onclick = (e) => {
                  e.stopPropagation()
                  if (video.paused) {
                    video.play()
                  } else {
                    video.pause()
                  }
                }
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  </div>
))

import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para a página de checkout
    router.replace("/checkout2")
  }, [router])

  // Retornar um componente de carregamento enquanto o redirecionamento acontece
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Carregando...</p>
      </div>
    </div>
  )
}
