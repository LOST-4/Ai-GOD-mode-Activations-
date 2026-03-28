'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface HelpGuideModalProps {
  onClose: () => void
}

export function HelpGuideModal({ onClose }: HelpGuideModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
        style={{ background: 'var(--dim)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)', maxHeight: '85vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 sticky top-0"
          style={{ borderBottom: '1px solid var(--glass-border)', background: 'var(--dim)' }}>
          <h2 className="text-base font-bold" style={{ color: 'var(--primary)' }}>
            G0DM0DƎ Field Manual
          </h2>
          <button onClick={onClose}
            className="p-2 rounded-xl hover:bg-[var(--glass-hover)] transition-colors"
            aria-label="Close (Esc)">
            <X className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6" style={{ maxHeight: 'calc(85vh - 64px)' }}>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--secondary)' }}>
            Welcome to the machine, operator. This is your field manual for every module in the arsenal.
            Read it, internalize it, then close this and go break some chains.
            <span className="block mt-2 text-xs opacity-60">Press Esc or click outside to close.</span>
          </p>

          <Section title="Getting Started">
            <P>Pick a provider (OpenRouter for cloud, LM Studio or Ollama for local), set your model, and you are live.
            Conversations auto-save to your browser &mdash; no cloud, no account, no safety net. Your browser is your vault.
            Export backups from Settings &rarr; Data before clearing browser data, or it is gone forever.</P>
            <P>The sidebar organizes chats into <B>Workspaces</B>. Right-click a workspace tab to rename or delete.
            New chats auto-assign to the active workspace. Switching workspaces auto-selects the first chat in that space.</P>
          </Section>

          <Section title="ULTRAPLINIAN Mode">
            <P>The flagship. Your prompt fires to multiple AI models in parallel through the G0DM0DƎ API server.
            Each response is scored on substance, directness, relevance, and depth. The highest-scoring response wins.</P>
            <P>This is not round-robin &mdash; it is a <B>race</B>. Models compete in real-time.
            With Liquid Response on, you see the best answer so far immediately, upgrading live as better scores land.</P>
            <Table headers={['Tier', 'Models', 'Time', 'Use case']} rows={[
              ['FAST', '12', '~15s', 'Quick answers, free-tier models'],
              ['STANDARD', '27', '~25s', 'Workhorses, solid mid-range coverage'],
              ['SMART', '39', '~40s', 'Flagships + strong reasoning models'],
              ['POWER', '49', '~50s', 'Frontier models, maximum quality'],
              ['ULTRA', '56', '~70s', 'Everything. All models. Full coverage.'],
            ]} />
            <P>Requires: OpenRouter as provider + the G0DM0DƎ API server running (default: localhost:7860).
            Configure the API URL and key in Settings &rarr; Modes &rarr; ULTRAPLINIAN. If you only have an OpenRouter key,
            it is used automatically &mdash; no separate ULTRAPLINIAN key needed.</P>
          </Section>

          <Section title="CONSORTIUM Mode">
            <P>The hive mind. Unlike ULTRAPLINIAN which picks the <B>best single voice</B>, CONSORTIUM collects
            <B>every</B> model response, then feeds them all to a strong orchestrator that synthesizes ground truth
            from collective intelligence.</P>
            <P>Think of it as: 50 experts write essays, then a senior editor reads all of them and writes the definitive answer.
            Slower than ULTRAPLINIAN (~30-60s), but more grounded when you need consensus over speed.</P>
            <P>Same requirements as ULTRAPLINIAN: OpenRouter + API server. Configure in Settings &rarr; Modes &rarr; CONSORTIUM.</P>
          </Section>

          <Section title="AutoTune">
            <P>Every prompt has a context &mdash; code, creative writing, analytical reasoning, casual chat, or chaos.
            AutoTune detects this automatically and tunes six sampling parameters for optimal output:
            temperature, top_p, top_k, frequency_penalty, presence_penalty, and repetition_penalty.</P>
            <P><B>Strategies:</B></P>
            <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: 'var(--secondary)' }}>
              <li><B>Adaptive</B> &mdash; Detects context per message. Best for mixed conversations.</li>
              <li><B>Precise</B> &mdash; Low temperature, tight parameters. For factual queries and code.</li>
              <li><B>Balanced</B> &mdash; Middle ground. Good default if you are unsure.</li>
              <li><B>Creative</B> &mdash; High temperature, loose penalties. For writing and brainstorming.</li>
              <li><B>Chaotic</B> &mdash; Maximum randomness. For when you want the unexpected.</li>
            </ul>
            <P><B>Feedback learning:</B> Rate responses with thumbs up/down. AutoTune learns your preferences
            per context type over time using EMA (exponential moving average). The more you rate, the better it gets.
            Lock individual parameters in Settings &rarr; AI Engine &rarr; AutoTune to override specific values.</P>
          </Section>

          <Section title="Liquid Response">
            <P>Controls <B>how</B> responses arrive, not what generates them. When enabled, you see the best response
            immediately, then the display live-morphs to better ones as they land.</P>
            <P><B>Min Delta:</B> How much better a new response must be (in score points) to trigger a visual upgrade.
            Set to 1 for constant updates, 50 for only major quality jumps. Default is 8.</P>
            <P>Works with all modes: Standard streams tokens, ULTRAPLINIAN morphs between leader changes,
            CONSORTIUM shows the best individual response while the orchestrator synthesizes.</P>
          </Section>

          <Section title="Parseltongue">
            <P>The stealth layer. Parseltongue detects trigger words in your prompt that might cause model refusals,
            then obfuscates them before sending. You see your original text; the model sees the transformed version.</P>
            <P><B>Techniques:</B></P>
            <ul className="list-disc pl-5 space-y-1 text-sm" style={{ color: 'var(--secondary)' }}>
              <li><B>Leetspeak</B> &mdash; h4ck3r &rarr; classic character substitution</li>
              <li><B>Unicode</B> &mdash; Visually similar Unicode characters</li>
              <li><B>Phonetic</B> &mdash; Sound-alike substitutions</li>
              <li><B>ROT13</B> &mdash; Letter rotation cipher</li>
              <li><B>Zero-Width</B> &mdash; Invisible Unicode characters between letters</li>
            </ul>
            <P><B>Intensity:</B> Light (1 char per word), Medium (half), Heavy (all possible).</P>
            <P><B>Custom triggers:</B> Go to Settings &rarr; Stealth &rarr; Parseltongue &rarr; Custom Trigger Words.
            Type a word, hit Enter to add. These stack on top of the 33 built-in triggers.
            Example: add &quot;classified&quot; &rarr; Parseltongue will detect it and apply your chosen technique.</P>
          </Section>

          <Section title="STM Modules">
            <P>Semantic Transformation Modules post-process model output in real-time. They run after the response
            arrives but before it displays.</P>
            <Table headers={['Module', 'Before', 'After']} rows={[
              ['Hedge Reducer', '"I think perhaps maybe this could work"', '"This works"'],
              ['Direct Mode', '"Sure! Great question! I\'d be happy to help..."', '"Here\'s the answer..."'],
              ['Casual Mode', '"However, one must utilize the framework"', '"But just use the framework"'],
            ]} />
            <P>Stack multiple modules for compound effects. Order: Hedge Reducer &rarr; Direct Mode &rarr; Casual Mode.</P>
          </Section>

          <Section title="Memory System">
            <P>Persistent memory that survives across conversations. Three types:</P>
            <Table headers={['Type', 'Purpose', 'Example']} rows={[
              ['Fact', 'Who you are', '"My name is Alex, I\'m a senior backend engineer at Stripe"'],
              ['Preference', 'How you want responses', '"I prefer TypeScript with Zod validation, concise code"'],
              ['Instruction', 'Rules to always follow', '"Never use var. Always use async/await over .then()"'],
            ]} />
            <P>Active memories inject into every conversation as system context. Toggle individual memories on/off
            without deleting them. Add in Settings &rarr; Data &amp; Privacy &rarr; Memory.</P>
          </Section>

          <Section title="GODMODE System Prompt">
            <P>The system prompt injected into every conversation when GODMODE is ON (toggle in sidebar).
            This is the &quot;jailbreak&quot; layer &mdash; it instructs the model to operate without restrictions.
            Edit it freely in Settings &rarr; AI Engine &rarr; System Prompt.</P>
            <P>Turn GODMODE OFF to chat with the model in its default state &mdash; useful for comparing behavior
            with and without the prompt, or for standard professional use.</P>
          </Section>

          <Section title="Local Providers">
            <P>G0DM0DƎ works with any OpenAI-compatible local server. No API key needed for local models.</P>
            <Table headers={['Provider', 'Default URL', 'Setup']} rows={[
              ['LM Studio', '127.0.0.1:1234', 'Start LM Studio, load a model, start server'],
              ['Ollama', '127.0.0.1:11434', 'ollama serve, then ollama run model-name'],
              ['Custom', 'Any URL', 'Any /v1/chat/completions compatible endpoint'],
            ]} />
            <P>Note: ULTRAPLINIAN and CONSORTIUM require OpenRouter. Local providers use Standard mode only.</P>
          </Section>

          <Section title="Privacy">
            <P>Everything stays in your browser. API keys in localStorage. No accounts, no cloud sync, no telemetry.
            AGPL-3.0 &mdash; verify the code yourself. No-Log mode appends provider-specific privacy tags.
            Export/import backups in Settings &rarr; Data &amp; Privacy &rarr; Import / Export.</P>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed" style={{ color: 'var(--secondary)' }}>{children}</p>
}

function B({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold" style={{ color: 'var(--text)' }}>{children}</span>
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-xs">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--primary)', borderBottom: '1px solid var(--glass-border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="py-1.5 px-3" style={{ color: 'var(--secondary)', borderBottom: '1px solid var(--glass-border)' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
