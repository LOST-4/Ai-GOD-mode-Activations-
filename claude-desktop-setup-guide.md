# Claude Desktop: Multi-Domain Setup Guide
### Coding | Blender | 3D Modeling | Video Editing

---

## Before You Start: Two Things to Confirm

**1. Which app are you using?**

| App | Purpose |
|---|---|
| **Claude Desktop** | Chat interface + MCP server support |
| **Claude Code Desktop** | Agentic coding environment (Code tab inside Claude Desktop) |

This guide covers **Claude Desktop** as the base. Claude Code runs inside it via the Code tab.

**2. Linux note:** Claude Code Desktop is not supported on Linux. Use the terminal version instead:
```bash
npm install -g @anthropic-ai/claude-code
```

---

## Section 1: Environment and Version Considerations

### Supported Operating Systems

| OS | Claude Desktop | Claude Code Desktop | Claude Code (Terminal) |
|---|---|---|---|
| Windows 10/11 (x64) | Yes | Yes | Yes |
| Windows 11 ARM64 | Yes | Yes (ARM64 installer) | Yes |
| macOS 12+ | Yes | Yes | Yes |
| Linux | Yes (web only) | No | Yes |

### Required System Dependencies

Install these in order. Each step depends on the previous one.

**Step 1: Python 3.10 or higher**
```bash
python --version   # must be 3.10+
```
Download from: https://www.python.org/downloads/

**Step 2: Node.js 18 or higher** (required for Claude Code)
```bash
node --version     # must be 18+
```
Download from: https://nodejs.org/

**Step 3: uv (fast Python package runner)**

Windows (PowerShell):
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

macOS/Linux:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Confirm:
```bash
uvx --version
```

**Step 4: Blender 4.0+** (for 3D workflows)
Download from: https://www.blender.org/download/

**Step 5: Claude Desktop**
Download from: https://claude.ai/download

---

### MCP Config File Location

| OS | Path |
|---|---|
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |

Open it via: **Claude Desktop > Settings > Developer > Edit Config**

---

## Section 2: General Workspace Setup

### Recommended Folder Structure

Keep all Claude-related work in one root folder. This makes it easy to reference files in prompts.

```
ClaudeWorkspace/
│
├── coding/
│   ├── projects/           # Active dev projects
│   ├── snippets/           # Reusable code snippets
│   ├── prompts/            # Saved coding prompt templates
│   └── docs/               # Generated documentation
│
├── blender/
│   ├── scenes/             # .blend files
│   ├── assets/             # Models, textures, HDRIs
│   ├── renders/            # Output images/animations
│   ├── scripts/            # Python scripts for Blender
│   └── prompts/            # Blender prompt templates
│
├── scenarios/
│   ├── storyboards/        # Scene planning docs
│   ├── scripts/            # Written scripts
│   ├── assets/             # Linked 3D/video assets
│   └── prompts/            # Scenario prompt templates
│
├── video/
│   ├── raw/                # Source footage
│   ├── edits/              # Project files (DaVinci, Premiere)
│   ├── exports/            # Final renders
│   └── prompts/            # Video editing prompt templates
│
└── claude_config/
    ├── claude_desktop_config.json   # Backup of your MCP config
    └── notes.md                     # Personal setup notes
```

### Best Practices for Staying Organized

- Name prompt files by domain and date: `blender_scene_setup_2026-04.md`
- Keep a `notes.md` in each folder to track what worked and what did not
- Version your `.blend` files: `dungeon_scene_v1.blend`, `dungeon_scene_v2.blend`
- Store your MCP config backup in `claude_config/` so you can restore it fast after updates

---

## Section 3: Coding Workflow Integration

### Setup Options

**Option A: Claude Desktop (chat-based coding)**
No extra setup. Open Claude Desktop and start a coding conversation. Best for explanations, debugging help, and code generation.

**Option B: Claude Code for VS Code**
Install the Claude Code extension from the VS Code marketplace. This gives Claude direct access to your project files and terminal.

**Option C: Claude Code Terminal**
```bash
npm install -g @anthropic-ai/claude-code
cd your-project-folder
claude
```

### IDE and Editor Integration Tips

- In VS Code with Claude Code: Claude can read your entire codebase and make edits directly
- Always open Claude from your **project root folder**, not a subfolder
- Use `.claude/settings.json` inside your project to control what Claude can access

### Coding Prompt Templates

**Template 1: Debug a Bug**
```
I have a bug in my [language] code. Here is the error:

[paste error message]

Here is the relevant code:

[paste code block]

What I expected: [describe expected behavior]
What actually happened: [describe actual behavior]

Please:
1. Identify the root cause
2. Explain why this bug occurs
3. Provide a fixed version with comments explaining the change
```

**Template 2: Generate a Function**
```
Write a [language] function that does the following:

Task: [describe what the function should do]
Input: [describe input parameters and types]
Output: [describe return value and type]
Constraints: [any performance, memory, or style requirements]

Include:
- Heavily commented code
- Input validation
- A usage example at the bottom
```

**Template 3: Code Review and Documentation**
```
Review this [language] code and do the following:

1. Identify any bugs or logical errors
2. Suggest improvements for readability and performance
3. Write a docstring/JSDoc comment block for each function
4. Rate the code quality from 1 to 10 and explain why

Code:
[paste code here]
```

**Template 4: Architecture Planning**
```
I am building a [type of app] using [tech stack].

Key requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Please:
1. Suggest a folder structure
2. List the key components/modules needed
3. Describe how data flows between them
4. Identify any potential bottlenecks or risks
```

---

## Section 4: Blender Animation and 3D Modeling

### MCP Setup (One-Time)

**Step 1: Install BlenderMCP Addon in Blender**
1. Download `addon.py` from: https://github.com/ahujasid/blender-mcp
2. Open Blender
3. Go to **Edit > Preferences > Add-ons**
4. Click **Install from Disk** and select `addon.py`
5. Enable it by ticking the checkbox

**Step 2: Start the Blender Server**
1. Press **N** in the 3D Viewport to open the side panel
2. Find **Blender MCP** and click **Start MCP Server**
3. Confirm: "MCP Server started on port 9876"

**Step 3: Add Blender to Your MCP Config**
```json
{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["blender-mcp"]
    }
  }
}
```

Save and fully restart Claude Desktop. Look for the hammer icon in the input box.

**Important:** Only run one MCP server at a time. Never run the `uvx` command manually in the terminal.

### Blender Prompt Templates

**Template 1: Scene Setup**
```
Set up a Blender scene with the following:

Environment: [describe setting, e.g., "night-time forest with fog"]
Lighting: [e.g., "moonlight from the left, warm campfire from center"]
Camera: [e.g., "low angle, wide shot, looking up at the trees"]
Objects: [e.g., "3 pine trees, a wooden cabin, a dirt path"]

Use low-poly style. Set world background to dark blue sky with stars.
```

**Template 2: Object Creation**
```
Create a [object name] in Blender with these properties:

Shape: [basic geometry description]
Scale: [approximate real-world size]
Material: [color, roughness, metallic value]
Position: [coordinates or relative position in scene]

Add a subdivision surface modifier with 2 levels.
Apply smooth shading.
```

**Template 3: Animation Setup**
```
Set up an animation in Blender for the following action:

Object: [name of object in scene]
Action: [describe the movement, e.g., "a ball rolling from left to right and bouncing once"]
Duration: [number of frames, e.g., 120 frames at 24fps = 5 seconds]
Easing: [e.g., "ease in at start, ease out at end"]

Insert keyframes at the appropriate frames.
```

**Template 4: Export Settings**
```
Export the current Blender scene with these settings:

Format: [GLB / FBX / OBJ / GLTF]
Include: [meshes, materials, animations, textures]
Scale: [1.0 unless specified]
Destination: [file path]

Apply all modifiers before export. Make sure UV maps are included.
```

### Asset Import/Export Guide

| Format | Best For | Notes |
|---|---|---|
| `.glb` / `.gltf` | Web / game engines | Includes textures |
| `.fbx` | Unity, Unreal Engine | Good animation support |
| `.obj` | Simple static meshes | No animation |
| `.blend` | Blender-to-Blender | Full scene data |

---

## Section 5: Scenario Creation Workflow

Scenario creation means designing full narrative environments: storyboards, scene layouts, linked assets, and character placement. Claude handles the planning and scripting. Blender handles the 3D execution.

### Recommended Workflow Order

```
1. Write scenario brief (Claude)
         ↓
2. Create storyboard outline (Claude)
         ↓
3. List required 3D assets (Claude)
         ↓
4. Build assets in Blender (BlenderMCP)
         ↓
5. Assemble scene in Blender (BlenderMCP)
         ↓
6. Write scene descriptions for video (Claude)
         ↓
7. Export for video editing (BlenderMCP)
```

### Scenario Prompt Templates

**Template 1: Scenario Brief**
```
I am creating a [genre] short film/game scenario.

Setting: [time period, location, world type]
Main characters: [list with 1-line descriptions]
Core conflict: [what is the central problem or tension]
Tone: [e.g., dark, comedic, dramatic, action-heavy]
Target length: [e.g., 2-minute cinematic, 5-scene storyboard]

Write a full scenario brief including:
1. Opening situation
2. Rising tension
3. Key scene breakdown (5-7 scenes)
4. Climax
5. Resolution
```

**Template 2: Storyboard Planning**
```
Break this scenario into a visual storyboard with [number] panels.

For each panel, provide:
- Scene number and name
- Camera angle (wide, medium, close-up, POV)
- Character positions and actions
- Key dialogue or sound cues
- Lighting mood
- Transition to next panel (cut, fade, dissolve)

Scenario summary:
[paste your scenario brief here]
```

**Template 3: Asset List Generator**
```
Based on this scenario, generate a complete asset list for Blender production.

Scenario:
[paste scenario or storyboard here]

List:
1. 3D Objects (with rough polygon budget)
2. Characters (with rig requirements)
3. Environments/sets
4. Textures and materials
5. Lighting setups per scene
6. Camera setups per scene

Flag any asset that would require external download (Poly Haven, Sketchfab, etc).
```

---

## Section 6: Video Editing Aids

### MCP Options for Video Editing

**Option A: Reap MCP (easiest, cloud-based)**

Handles: clipping, captions (98+ languages), dubbing, reframing.

Get API key at: https://reap.video

Add to config:
```json
"reap": {
  "command": "uvx",
  "args": ["reap-mcp", "YOUR_REAP_API_KEY"]
}
```

Free tier includes 1 hour of video processing.

**Option B: Video Editor MCP (DaVinci Resolve integration)**

Handles: upload, edit generation, semantic video search.

Get API key at: https://app.videojungle.ai

Add to config:
```json
"video-editor-mcp": {
  "command": "uvx",
  "args": ["video-editor-mcp", "YOUR_VIDEOJUNGLE_API_KEY"]
}
```

### Video Editing Prompt Templates

**Template 1: Script Writing**
```
Write a video script for the following:

Topic/Story: [describe what the video is about]
Target audience: [who will watch this]
Tone: [e.g., educational, dramatic, casual, cinematic]
Duration: [target video length in minutes]
Format: [voiceover only / dialogue / on-camera host / narrated slides]

Include:
- Scene-by-scene breakdown
- Voiceover or dialogue text
- Visual direction notes for each scene
- Suggested background music mood
```

**Template 2: Rough Cut Plan**
```
Create a rough cut plan for this video project.

Total footage available: [list clips with rough duration]
Target final duration: [e.g., 3 minutes]
Story goal: [what emotion or message should the viewer leave with]

Output:
1. Suggested clip order with in/out point notes
2. Transitions between clips
3. Where to add music, sound effects, or silence
4. Any footage that is missing and needs to be filmed or sourced
```

**Template 3: Editing Notes Generator**
```
I have a rough cut of a video. Give me detailed editing notes.

Issues I noticed:
- [e.g., pacing feels slow in the middle section]
- [e.g., color grading is inconsistent across scenes]
- [e.g., audio levels spike in scene 3]

Footage description:
[brief description of what the video shows]

Please suggest:
1. Specific cuts to make
2. Color grading direction (warm, cool, neutral, cinematic)
3. Audio fixes
4. Title card and text suggestions
5. Export format recommendations
```

**Template 4: Export Settings Guide**
```
What export settings should I use for this video?

Platform: [YouTube / Instagram Reels / TikTok / Film Festival / Client Delivery]
Resolution: [1080p / 4K / vertical 9:16]
Codec preference: [H.264 / H.265 / ProRes]
File size limit: [if any]
Color space: [Rec.709 / Rec.2020 / sRGB]

Provide settings for: bitrate, frame rate, audio codec, and container format.
```

### Export Settings Quick Reference

| Platform | Resolution | FPS | Codec | Bitrate |
|---|---|---|---|---|
| YouTube | 3840x2160 (4K) | 24/30 | H.264 or H.265 | 35-45 Mbps |
| Instagram Reels | 1080x1920 | 30 | H.264 | 3.5 Mbps |
| TikTok | 1080x1920 | 30 | H.264 | 3-8 Mbps |
| Film Festival | 1920x1080 min | 24 | ProRes 422 | Lossless |
| Client Delivery | As specified | Match source | H.264 or ProRes | High |

---

## Section 7: Performance and Safety

### Managing Prompt Latency

- Keep prompts focused. One task per prompt works faster than combining many tasks.
- For Blender MCP, break big scenes into steps. Build objects first, then materials, then lighting.
- If a prompt times out, simplify the request and retry. Complex 3D commands sometimes need multiple passes.

### Prompt Caching and Reuse

- Save your best prompts to text files in your `prompts/` folders.
- Build a personal prompt library organized by task type.
- Use a naming convention: `[domain]_[task]_[version].txt` (e.g., `blender_scene_setup_v2.txt`)

### File Versioning

- Never overwrite `.blend` files directly. Always **Save As** with a new version number.
- For code, use Git. Initialize a repo in every project folder:
  ```bash
  git init
  git add .
  git commit -m "initial commit"
  ```
- For video projects, keep raw footage separate from edit project files. Never delete raw footage.

### Privacy Considerations

- Claude Desktop sends your prompts to Anthropic's servers. Do not paste API keys, passwords, or personal data into prompts.
- MCP servers run locally on your machine (for BlenderMCP and local video tools). Your 3D scene data stays local.
- Cloud-based MCPs like Reap send video data to their servers. Check their privacy policy before uploading client footage.
- Use separate Claude Projects for work and personal use to keep context isolated.

### System Resource Tips

- Blender and Claude Desktop can both be memory-heavy. Close browser tabs when working in Blender.
- Render in Blender separately from Claude sessions. Do not try to trigger a full Blender render via MCP while also running a long Claude conversation.
- For video export, close Claude Desktop to free RAM if you are exporting 4K footage.

---

## Section 8: Sample Starter Prompts

### Coding (Ready to Use)

**1. First-Time Project Setup**
```
I am starting a new project. Tech stack: [e.g., ASP.NET Core, MySQL, Tailwind CSS].

Create:
1. A recommended folder structure
2. A list of NuGet/npm packages to install
3. A basic project initialization checklist
4. A starter README.md template
```

**2. Explain This Code to Me**
```
I am a computer science student. Explain this code to me like I am in Grade 10.

[paste code here]

Break it down:
1. What does this code do overall?
2. Explain each major section in plain English
3. What would happen if I removed [specific part]?
4. What concepts from my CSE course does this relate to?
```

**3. Convert Pseudocode to Real Code**
```
Convert this pseudocode to working [language] code.

Pseudocode:
[paste pseudocode]

Requirements:
- Add comments explaining each step
- Follow clean code principles
- Include error handling
- Test it with these sample inputs: [list inputs]
```

---

### Blender 3D (Ready to Use)

**1. Quick Scene Bootstrap**
```
Create a new Blender scene from scratch.

Theme: [e.g., "sci-fi laboratory at night"]
Objects to add: [e.g., "a metal table, three glass containers, a holographic panel"]
Lighting: [e.g., "blue and purple neon lights, slight fog"]
Camera: [e.g., "medium shot from the doorway looking in"]

Use emission materials for the neon elements. Set render engine to Cycles.
```

**2. Character Pose Setup**
```
In the current Blender scene, set up a character pose.

Character object: [name of armature in scene]
Pose: [describe the pose, e.g., "standing with left arm raised, head turned right, slight forward lean"]
Frame: [frame number to set the pose on]

Insert a keyframe after posing. Set interpolation to Bezier.
```

**3. Material Library Setup**
```
Create a set of reusable materials in Blender for a [theme, e.g., "medieval stone dungeon"].

Materials to create:
1. Rough stone wall
2. Worn wooden planks
3. Rusted iron metal
4. Wet cobblestone floor
5. Flickering torch flame (emission)

Use Principled BSDF for all except flame. Name each material clearly.
```

---

### Scenario Creation (Ready to Use)

**1. Scene Design Brief**
```
Design a detailed scene for [type of project: game, film, animation].

Premise: [1-2 sentence story setup]
Location: [where does this scene take place]
Characters present: [list with roles]
Objective of scene: [what must happen in this scene]
Emotional tone: [tense, peaceful, chaotic, mysterious]

Output:
- Scene description (2 paragraphs)
- Blocking diagram in text format (who stands where)
- Key dialogue or action beats
- What 3D assets are needed to build this in Blender
```

**2. Storyboard to Shot List**
```
Convert this storyboard into a production shot list.

Storyboard:
[paste storyboard or scene descriptions]

For each shot provide:
- Shot number
- Shot type (wide, medium, close-up, insert)
- Camera movement (static, pan, tilt, dolly, orbit)
- Duration (in seconds)
- Characters and actions in frame
- Notes for Blender camera setup
```

**3. World-Building Brief**
```
Help me build the world for this story.

Genre: [e.g., post-apocalyptic, fantasy, sci-fi]
Setting: [time period and location]
Key rule of this world: [one thing that makes it unique, e.g., "gravity reverses at night"]

Generate:
1. A 3-paragraph world description
2. Key visual elements that define this world (for use in 3D design)
3. Cultural and architectural notes
4. Lighting and atmosphere guide for Blender scenes
```

---

### Video Editing (Ready to Use)

**1. Cold Open Script**
```
Write a cold open for a [genre] video.

Hook goal: Grab attention in the first 10 seconds.
Topic: [what the video is about]
Tone: [serious, energetic, mysterious, humorous]

Include:
- Exact words for voiceover or dialogue
- Visual suggestion for each line
- Sound design note (e.g., "hard cut with impact sound")
- End of cold open cue (what transitions into the main content)
```

**2. B-Roll Shot List**
```
Generate a B-roll shot list for this video.

Main topic: [describe what the main video covers]
Setting: [where the main footage is filmed]
Target video length: [e.g., 5 minutes]

For each B-roll shot:
- Shot description
- Suggested duration (seconds)
- Camera movement
- When to cut it in (which main topic moment it supports)
- Mood it should convey
```

**3. Pacing and Flow Review**
```
Review the pacing of this video script or rough cut description.

[paste script or scene-by-scene time breakdown]

Identify:
1. Moments where pacing drags (too slow)
2. Moments that feel rushed
3. Where to add breathing room (pause, ambient sound, slow shot)
4. Suggested cut points for tighter editing
5. Recommended total runtime after edits
```

---

## Section 9: Quick-Start 15-Minute Checklist

Run this every time you sit down to work. It takes about 15 minutes on the first day and 3 minutes on repeat days.

### First-Time Setup (15 minutes)

```
[ ] 1. Install Python 3.10+        (2 min)
[ ] 2. Install Node.js 18+         (2 min)
[ ] 3. Install uv                  (1 min)
[ ] 4. Install Claude Desktop      (2 min)
[ ] 5. Install Blender 4.0+        (3 min)
[ ] 6. Download BlenderMCP addon   (1 min)
[ ] 7. Install addon in Blender    (2 min)
[ ] 8. Edit claude_desktop_config  (1 min)
[ ] 9. Restart Claude Desktop      (30 sec)
[ ] 10. Verify hammer icon appears  (30 sec)
```

### Daily Startup Routine (3 minutes)

```
[ ] 1. Open Claude Desktop                        (15 sec)
[ ] 2. Open Blender (if doing 3D work)            (20 sec)
[ ] 3. Press N in Blender > Start MCP Server      (10 sec)
[ ] 4. Confirm "port 9876" message shows          (5 sec)
[ ] 5. Open your project folder in file explorer  (10 sec)
[ ] 6. Open today's prompt template file          (15 sec)
[ ] 7. Start a new Claude conversation            (10 sec)
[ ] 8. Paste context: "I am working on [project]. (30 sec)
       Today I need to [goal]."
[ ] 9. Begin working                              (rest of session)
```

### End-of-Session Routine (2 minutes)

```
[ ] 1. Save your .blend file with new version number
[ ] 2. Git commit any code changes
[ ] 3. Copy any useful prompts to your prompts/ folder
[ ] 4. Write 2 lines in notes.md: what you did, what to do next
[ ] 5. Stop the Blender MCP Server
[ ] 6. Close Claude Desktop fully (do not just minimize)
```

---

## Full MCP Config Template

Copy this entire block into your `claude_desktop_config.json`. Remove sections you do not need.

```json
{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["blender-mcp"]
    },
    "video-editor-mcp": {
      "command": "uvx",
      "args": ["video-editor-mcp", "YOUR_VIDEOJUNGLE_API_KEY"]
    },
    "reap": {
      "command": "uvx",
      "args": ["reap-mcp", "YOUR_REAP_API_KEY"]
    }
  }
}
```

**After editing this file:** Quit Claude Desktop completely (do not just close the window). Reopen it. The hammer icon in the chat input box confirms your MCP servers are live.

---

## Capability Map: What Claude Can and Cannot Do

| Domain | Claude Can | Claude Cannot |
|---|---|---|
| Coding | Write, explain, debug, document, review | Run your code (unless using Claude Code) |
| Blender | Control scene, add objects, set materials, animate | Render your scene itself |
| 3D Modeling | Generate via prompts through BlenderMCP | Open proprietary 3D formats directly |
| Video Editing | Script, plan, caption, clip via MCP tools | Edit a timeline directly in Premiere or DaVinci |
| Scenarios | Write, plan, storyboard, generate asset lists | Generate images or video natively |

---

*Last updated: April 2026 | Based on Claude Desktop with MCP support*
