'use client'

import { useStore } from '@/store'
import { Zap, ZapOff } from 'lucide-react'

export function PersonaSelector() {
  const { personas, currentPersona, useCustomSystemPrompt, setUseCustomSystemPrompt } = useStore()
  const activePersona = personas.find(p => p.id === currentPersona) || personas[0]
  const isOn = useCustomSystemPrompt

  return (
    <div className="relative">
      <label className="text-[11px] font-medium mb-1.5 block" style={{ color: 'var(--secondary)' }}>Mode</label>
      <button
        onClick={() => setUseCustomSystemPrompt(!isOn)}
        className="w-full flex items-center justify-between px-3 py-2 glass rounded-xl text-sm
          transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
        title={isOn ? 'GODMODE ON — custom system prompt active. Click to disable.' : 'GODMODE OFF — using default model behavior. Click to enable.'}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{activePersona.emoji}</span>
          <span className="font-semibold text-sm" style={{ color: isOn ? 'var(--primary)' : 'var(--secondary)' }}>
            {activePersona.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isOn ? (
            <>
              <Zap className="w-3 h-3" style={{ color: 'var(--primary)' }} />
              <span className="text-[10px] font-semibold" style={{ color: 'var(--primary)' }}>ON</span>
            </>
          ) : (
            <>
              <ZapOff className="w-3 h-3" style={{ color: 'var(--secondary)', opacity: 0.5 }} />
              <span className="text-[10px] font-semibold" style={{ color: 'var(--secondary)', opacity: 0.5 }}>OFF</span>
            </>
          )}
        </div>
      </button>
    </div>
  )
}
