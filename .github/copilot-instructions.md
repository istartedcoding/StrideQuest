# StrideQuest workspace instructions

- [x] Verify workspace instructions — Created and verified.
- [x] Clarify project requirements — Expo React Native, TypeScript, Expo Router, iOS/Android/web, responsive map-first MVP.
- [x] Scaffold the project — Stable Expo SDK 54 project created in the workspace root.
- [x] Customize the project — Dashboard, live activity, journeys, challenges, leaderboards, profile, onboarding, settings, domain engine, provider boundaries, and tests implemented.
- [x] Install required extensions — None required.
- [x] Compile the project — Strict TypeScript, five unit tests, dependency compatibility, and production web export pass.
- [x] Create and run task — `StrideQuest: CI Check` added and executed successfully.
- [x] Launch the project — Expo web preview is running on port 8081 and browser interaction was verified.
- [x] Ensure documentation is complete — README and workspace instructions are current.

## Development conventions

- Keep activity tracking, validation, route progress, and rendering separated.
- Treat the backend as the source of truth for competitive statistics.
- Never expose precise physical location without explicit consent.
- Preserve accessible controls and responsive phone/tablet layouts.
- Run `npm run check` before completing changes.
- The keyless map is a demo adapter; production map integrations belong behind `MapProvider`.
