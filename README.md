# Eris Debate

## ⚠️ This software is still in development ⚠️

A platform to (hopefully) facilitate productive debates

## Development

To run a development server, simply edit `src/utils/config.ts` file and start with
```
bun run dev
```

## Building

This project uses Static Site Generation (SSG) with SolidStart. First configure `src/utils/config.ts` then run:
```
bun run build
```
This will create the static files for the website in the `dist/` directory, which you can serve through any webserver.
