import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Game Stick Pro 4K - Console Retro com +20.000 Jogos | Smart Ilha",
  description:
    "🎮 Game Stick Pro 4K com mais de 20.000 jogos clássicos inclusos! Console retro plug & play com 2 controles sem fio, resolução 4K, jogos de Nintendo, PlayStation, Sega, Atari e muito mais. Frete grátis para todo Brasil. Reviva a nostalgia dos games clássicos!",
  keywords:
    "game stick, console retro, jogos clássicos, emulador, nintendo, playstation, sega, atari, smart ilha, 20000 jogos, plug and play, controle sem fio, 4k, frete gratis",
  generator: "v0.dev",
  robots: "index, follow",
  authors: [{ name: "Smart Ilha" }],
  creator: "Smart Ilha",
  publisher: "Smart Ilha",
  openGraph: {
    title: "Game Stick Pro 4K - Console Retro com +20.000 Jogos",
    description:
      "🎮 Reviva a nostalgia! Console retro com +20.000 jogos clássicos, 2 controles sem fio, resolução 4K. Frete grátis para todo Brasil!",
    url: "https://smartilha.com.br",
    siteName: "Smart Ilha",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Stick Pro 4K - Console Retro com +20.000 Jogos",
    description:
      "🎮 Reviva a nostalgia! Console retro com +20.000 jogos clássicos, 2 controles sem fio, resolução 4K. Frete grátis!",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3311118289180276');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3311118289180276&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ff7a00" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
