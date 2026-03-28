'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ChatArea } from '@/components/ChatArea'
import { SettingsModal } from '@/components/SettingsModal'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { HelpGuideModal } from '@/components/HelpGuideModal'
import { useStore, useCurrentConversation } from '@/store'
import { useEasterEggs } from '@/hooks/useEasterEggs'
import { useApiAutoDetect } from '@/hooks/useApiAutoDetect'
import { resolveInferenceBaseUrl, upstreamRequiresApiKey } from '@/lib/upstream'

export default function Home() {
  const {
    theme,
    showSettings,
    setShowSettings,
    apiKey,
    ultraplinianApiUrl,
    ultraplinianApiKey,
    inferenceProvider,
    inferenceCustomBaseUrl,
    isHydrated
  } = useStore()
  const currentConversation = useCurrentConversation()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showGuide, setShowGuide] = useState(false)

  useEasterEggs()
  useApiAutoDetect()

  const proxyMode = !apiKey && !!ultraplinianApiUrl && !!ultraplinianApiKey
  const v1 = resolveInferenceBaseUrl(inferenceProvider, inferenceCustomBaseUrl)
  const canDirect =
    upstreamRequiresApiKey(v1) ? !!apiKey.trim() : inferenceProvider !== 'custom' || !!inferenceCustomBaseUrl.trim()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-matrix', 'theme-hacker', 'theme-glyph', 'theme-minimal', 'theme-dark', 'theme-light')
    root.classList.add(`theme-${theme}`)
  }, [theme])

  if (!isHydrated) {
    return (
      <div className={`theme-${theme} min-h-screen flex items-center justify-center`}
        style={{ background: 'var(--bg)' }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-violet-500 pulse-soft" />
          <span className="text-sm font-medium" style={{ color: 'var(--secondary)' }}>
            <span className="loading-dots">Initializing G0DM0D3</span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <main className={`theme-${theme} h-screen flex relative overflow-hidden`}
      style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col transition-all duration-300">
        {(!canDirect && !proxyMode) || !currentConversation ? (
          <WelcomeScreen onOpenSettings={() => setShowSettings(true)} onOpenGuide={() => setShowGuide(true)} />
        ) : (
          <ChatArea sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onOpenGuide={() => setShowGuide(true)} />
        )}
      </div>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}

      {showGuide && (
        <HelpGuideModal onClose={() => setShowGuide(false)} />
      )}
    </main>
  )
}
