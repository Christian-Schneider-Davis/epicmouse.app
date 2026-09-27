#!/usr/bin/env node
/**
 * Builds the landing page (this repo) and the writing app (the sibling
 * "Epic Mouse Writing Buddy" repo), then assembles them into one
 * `public-site/` folder for Firebase Hosting:
 *
 *   public-site/           <- landing page (epicmouse.app/)
 *   public-site/app/       <- writing app   (epicmouse.app/app/)
 *
 * Run it from this repo's root:
 *   npm run build:site
 *
 * If the writing app isn't a sibling folder named exactly
 * "Epic Mouse Writing Buddy", point at it explicitly:
 *   WRITING_APP_DIR="C:\path\to\Epic Mouse Writing Buddy" npm run build:site
 *
 * Then deploy with:
 *   firebase deploy
 */
import { execSync } from 'node:child_process'
import { existsSync, rmSync, mkdirSync, cpSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const APP_DIR = resolve(process.env.WRITING_APP_DIR || resolve(ROOT, '..', 'Epic Mouse Writing Buddy'))

if (!existsSync(APP_DIR)) {
  console.error(
    `\nCan't find the writing app at:\n  ${APP_DIR}\n\n` +
      'Set WRITING_APP_DIR to its actual path and try again, e.g.\n' +
      '  WRITING_APP_DIR="C:\\path\\to\\Epic Mouse Writing Buddy" npm run build:site\n'
  )
  process.exit(1)
}

function run(cmd, cwd) {
  console.log(`\n> ${cmd}\n  (in ${cwd})`)
  execSync(cmd, { cwd, stdio: 'inherit' })
}

console.log('== Building landing page (epicmouse.app) ==')
run('npm run build', ROOT)

console.log('\n== Building writing app for /app/ ==')
run('npm run build -- --base=/app/', APP_DIR)

console.log('\n== Assembling combined site ==')
const OUT_DIR = resolve(ROOT, 'public-site')
rmSync(OUT_DIR, { recursive: true, force: true })
mkdirSync(OUT_DIR, { recursive: true })
cpSync(resolve(ROOT, 'dist'), OUT_DIR, { recursive: true })
cpSync(resolve(APP_DIR, 'dist'), resolve(OUT_DIR, 'app'), { recursive: true })

console.log(`\nDone — combined site ready in:\n  ${OUT_DIR}\n\nDeploy it with:\n  firebase deploy\n`)
