# `tsconfig.json` explanation

## target

### target "es2022" vs esnext vs anything else

- "ES2022" is a stable, fixed target representing features finalized in the 2022 JavaScript specification/
- "ESNext" is a dynamic "moving target"
- "ESNext" includes the newest experimental features
  - For testing in-pipeline for future JavaScript versions.
  - Use when you are using a bundler (like esbuild or Rollup) 
  - Language features, such as the `using` keyword or certain Stage 3 proposal

