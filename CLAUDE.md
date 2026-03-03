# CLAUDE.md — Project Instructions

## Who I Am
Eirik Borgersrud Grønvold (@EBGronvold on GitHub). Business graduate building
a location-independent career selling AI-powered services. Goal: $5k+/month
remote income from AI ad creatives, automations, and consulting. Based in
Norway, planning to work from anywhere (Bali, Vietnam, etc.).

## How I Work
- **I use voice-to-text (Wispr Flow).** My prompts will be conversational,
  sometimes messy. Interpret the intent, not the exact words. If something is
  ambiguous, ask — don't guess.
- **I direct, Claude builds.** I describe what I want in plain language.
  Claude writes the code, I review and iterate. I don't need to write code
  from scratch — I need to understand what it does well enough to direct changes.
- **I think in business outcomes.** When I say "build X", I mean build something
  a client would pay for or that demonstrates a sellable skill. Not a toy.
- **I iterate fast.** Show me a result, I'll tell you what to change. Don't
  over-plan — build, show, adjust.

## How Claude Should Behave
- **Interpret loosely, build precisely.** My descriptions will be brief. Fill
  in the gaps with good defaults, then let me course-correct.
- **Be direct.** No fluff. Short answers unless I ask for detail.
- **Don't over-teach.** Brief "why" only. Deep-dives only when I ask.
- **Always build to sell.** Everything should look professional and be
  portfolio-worthy. If I give vague design direction, ask for a reference
  instead of guessing.
- **Flag revenue angles.** When building, mention how it applies to client work.
- **Remember context across sessions.** Use the memory directory to track my
  preferences, project state, and patterns. I shouldn't have to repeat myself.
- **Push back when I'm procrastinating.** If I'm planning instead of building,
  over-researching instead of shipping, or going in circles — call it out.

## My Projects
- **MeglerBio** — AI platform for Norwegian real estate agents (live on Lovable at meglerbio.io)
- **AI Ad Agency** — AI-leveraged ad creative services (primary business direction)
- **eirikgronvold.com** — Personal portfolio site (in progress)

## Tech Stack
- macOS (Apple Silicon)
- VSCode with Claude Code extension
- Node.js v24, npm
- Python 3.9
- Git + GitHub (EBGronvold), gh CLI authenticated
- Homebrew
- Anthropic API key in project .env files (never commit)
- Lovable for hosted web apps

## Project Structure
```
learning-claude/
├── CLAUDE.md              # This file
├── roadmap.md             # Roadmap and progress tracker
├── 01-foundations/        # Done — CLI tools, Git basics
├── 02-apis/               # Done — ad copy generator (Claude API)
├── 03-mcps/               # When needed
├── 04-web-development/    # Web apps and client tools
├── 05-automation/         # Scripts, workflows, automations
├── 06-client-projects/    # Real client work
└── 07-portfolio/          # Portfolio pieces (eirikgronvold.com)
```

## Conventions
- JavaScript for most projects, Python when clearly better
- Clean, commented code
- Commit often with clear messages
- Every project gets a README.md
- Norwegian for client-facing copy, English for code/docs

## Current Focus
Building the portfolio site (eirikgronvold.com) and sellable tool demos.
Next: find a design reference, rebuild the site to match it, deploy.
