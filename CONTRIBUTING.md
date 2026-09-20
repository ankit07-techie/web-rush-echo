# Contributing to ECHOES

Thank you for your interest in contributing to **ECHOES** (Personal Sonic Archive & Listening Telemetry)! We welcome contributions that maintain the forensic precision, tactile material aesthetics, and strict performance and accessibility standards of this project.

---

## ✦ Code of Conduct

All contributors and maintainers are expected to uphold a respectful, inclusive, and professional environment. Constructive criticism, clear technical communication, and empathy are core tenets of our development process.

---

## ✦ Architectural Guidelines

1. **Unidirectional Data Flow**: Application state originates in context or top-level containers (`App.tsx`, `AudioPlayerContext.tsx`) and flows downward via typed props.
2. **Modular File Sizes**: Keep individual component files focused and concise. Large views should be decomposed into dedicated domain subcomponents (`src/components/*`).
3. **Strict TypeScript Typing**: No implicit `any` types. All entities, API responses, and audio nodes must have descriptive interfaces declared in `src/types.ts` or local module contracts.
4. **Tailwind Styling Conventions**:
   - Palette adheres strictly to the dark archival twilight motif (`#11131b` background, `#e2e1ee` text, `#d0bcff` violet accents, `#ffb95f` amber indicators).
   - Minimum body font size of 16px for legibility.
   - Touch targets must be at least 44px on mobile viewports.
5. **Web Audio & Playback Safety**:
   - Audio contexts must be initialized on explicit user interaction.
   - External track IDs must be sanitized via regex to prevent iframe parameter injections.
   - External images must include `referrerPolicy="no-referrer"`, `loading="lazy"`, and `decoding="async"`.

---

## ✦ Development Workflow

### 1. Setting Up Your Environment
```bash
# Clone the repository
git clone https://github.com/your-username/echoes-sonic-archive.git
cd echoes-sonic-archive

# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

### 2. Code Quality & Linting
Before submitting a pull request, verify that the codebase compiles cleanly and satisfies all linting rules:
```bash
# Run TypeScript compilation and linter
npm run lint

# Run production build validation
npm run build
```

---

## ✦ Pull Request Guidelines

- **Atomic Commits**: Group related changes into logical, well-described commits adhering to conventional commit guidelines (`feat:`, `fix:`, `docs:`, `perf:`, `refactor:`).
- **Documentation**: If adding or altering user-facing features, update `README.md`, `ARCHITECTURE.md`, and `CHANGELOG.md` accordingly.
- **Accessibility Verification**: Ensure all new interactive controls contain appropriate `aria-*` attributes and keyboard event listeners.

---

*Thank you for helping us document the subtle architecture of human memory through sound.*
