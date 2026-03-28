'use client'

import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/store'
import { ChevronDown } from 'lucide-react'

export function ThinkingPanel() {
  const {
    isStreaming,
    ultraplinianRacing,
    ultraplinianModelsResponded,
    ultraplinianModelsTotal,
    ultraplinianLiveModel,
    ultraplinianLiveScore,
    consortiumPhase,
    consortiumModelsCollected,
    consortiumModelsTotal,
    ultraplinianEnabled,
    consortiumEnabled,
  } = useStore()

  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [finalState, setFinalState] = useState<{
    title: string; responded: number; total: number; elapsed: number;
    winnerModel: string | null; winnerScore: number | null; done: boolean
  } | null>(null)
  const startRef = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)

  const isRacing = ultraplinianRacing || (consortiumPhase !== 'idle' && consortiumPhase !== 'done')
  const isActive = isStreaming || isRacing

  useEffect(() => {
    if (isActive) {
      setVisible(true)
      setFinalState(null)
      startRef.current = Date.now()
      const iv = setInterval(() => setElapsed(Math.round((Date.now() - startRef.current) / 1000)), 200)
      return () => clearInterval(iv)
    } else if (visible && !finalState) {
      const title = ultraplinianEnabled ? 'ULTRAPLINIAN' : consortiumEnabled ? 'CONSORTIUM' : 'STANDARD'
      setFinalState({
        title,
        responded: ultraplinianEnabled ? ultraplinianModelsResponded : consortiumModelsCollected,
        total: ultraplinianEnabled ? ultraplinianModelsTotal : consortiumModelsTotal,
        elapsed,
        winnerModel: ultraplinianLiveModel,
        winnerScore: ultraplinianLiveScore,
        done: true,
      })
    }
  }, [isActive])

  if (!visible) return null

  const done = !!finalState
  const title = done ? finalState.title : (consortiumEnabled && consortiumPhase !== 'idle') ? 'CONSORTIUM' : ultraplinianEnabled && ultraplinianRacing ? 'ULTRAPLINIAN' : 'GENERATING'
  const responded = done ? finalState.responded : (consortiumEnabled ? consortiumModelsCollected : ultraplinianModelsResponded)
  const total = done ? finalState.total : (consortiumEnabled ? consortiumModelsTotal : ultraplinianModelsTotal)
  const showElapsed = done ? finalState.elapsed : elapsed
  const winModel = done ? finalState.winnerModel : ultraplinianLiveModel
  const winScore = done ? finalState.winnerScore : ultraplinianLiveScore

  const icon = done ? '✓' : '🔥'
  const statusText = total > 0
    ? `${responded}/${total} models · ${showElapsed}s${done ? ' · done' : ''}`
    : `${showElapsed}s${done ? ' · done' : ''}`

  return (
    <div className="mx-4 mt-2 rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: done ? 'rgba(74,222,128,0.06)' : 'rgba(239,107,107,0.08)',
        border: `1px solid ${done ? 'rgba(74,222,128,0.2)' : 'rgba(239,107,107,0.2)'}`,
      }}>
      <div className="flex items-center justify-between">
        <button onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors">
          <span className={`text-sm ${!done ? 'pulse-soft' : ''}`}>{icon}</span>
          <span className="text-xs font-bold" style={{ color: done ? '#4ade80' : '#ff6b6b' }}>{title}</span>
          <span className="text-[11px]" style={{ color: 'var(--secondary)' }}>{statusText}</span>
          {winModel && (
            <span className="text-[10px] ml-auto" style={{ color: 'var(--secondary)' }}>
              👑 {winModel.split('/').pop()}{winScore != null ? ` (${winScore}pts)` : ''}
            </span>
          )}
        </button>
        <div className="flex items-center gap-1 pr-3">
          {done && (
            <button onClick={() => setVisible(false)}
              className="text-[10px] px-2 py-0.5 rounded-md hover:bg-[var(--glass-hover)] transition-all"
              style={{ color: 'var(--secondary)' }}>
              dismiss
            </button>
          )}
          <ChevronDown
            onClick={() => setExpanded(!expanded)}
            className={`w-3.5 h-3.5 cursor-pointer transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            style={{ color: 'var(--secondary)' }} />
        </div>
      </div>

      <div className="transition-all duration-300 overflow-hidden"
        style={{ maxHeight: expanded ? '400px' : '0' }}>
        <div className="px-4 pb-3 pt-1">
          {total > 0 ? (
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
              {Array.from({ length: total }, (_, i) => {
                const isResponded = i < responded
                const isWinner = winModel && isResponded && i === responded - 1
                const label = isWinner ? winModel.split('/').pop() : isResponded ? `Model ${i + 1}` : `Waiting...`
                const statusIcon = isWinner ? '👑' : isResponded ? '✓' : '·'
                return (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px]"
                    style={{
                      background: isWinner ? 'rgba(239,107,107,0.15)' : 'var(--accent)',
                      borderLeft: `2px solid ${isWinner ? '#ff6b6b' : isResponded ? '#4ade80' : 'transparent'}`,
                      opacity: isResponded ? 1 : 0.4,
                      color: 'var(--text)',
                    }}>
                    <span>{statusIcon}</span>
                    <span className="truncate">{label}</span>
                    {isWinner && winScore != null && (
                      <span className="ml-auto text-[10px]" style={{ color: '#ff6b6b' }}>{winScore}pts</span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--secondary)' }}>
              {done ? 'Completed' : <span className="shimmer rounded-lg" style={{ width: '60%', height: '8px', display: 'block' }} />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
