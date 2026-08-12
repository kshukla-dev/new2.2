#!/usr/bin/env bash
# VPS deployment: sync to tracked branch, install, build, reload PM2.
# Intended to be run on the server (e.g. from GitHub Actions over SSH).
#
# Set DEPLOY_DEBUG=1 (env) for bash trace (set -x) in logs.

set -Eeuo pipefail

log() {
  printf '[%s] %s\n' "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$*"
}

error_exit() {
  log "ERROR: $*"
  exit 1
}

# On any failing command, print a clear failure block (visible in GitHub Actions SSH output).
on_err() {
  local exit_code=$?
  # Avoid double-reporting if we already handled an error.
  if [ "${_DEPLOY_ERR_HANDLED:-0}" -eq 1 ]; then
    exit "${exit_code}"
  fi
  _DEPLOY_ERR_HANDLED=1
  log "======== DEPLOY FAILED ========"
  log "Step exited with code: ${exit_code}"
  log "Shell line number (approx): ${LINENO}"
  log "Failing command: ${BASH_COMMAND}"
  log "Context: APP_ROOT=${APP_ROOT:-<unset>} GIT_BRANCH=${GIT_BRANCH:-<unset>}"
  log "Tip: fix the issue above (git/npm/pm2). Re-run deploy after correcting."
  log "==============================="
  exit "${exit_code}"
}
trap on_err ERR

if [ "${DEPLOY_DEBUG:-0}" = "1" ] || [ "${DEPLOY_DEBUG:-}" = "true" ]; then
  log "DEPLOY_DEBUG enabled — tracing commands"
  set -x
  export PS4='+ ${BASH_SOURCE[0]}:${LINENO}: '
fi

# CI streams this script with `bash -s`; BASH_SOURCE is not reliable then. Prefer DEPLOY_PATH from the caller.
if [ -n "${DEPLOY_PATH:-}" ]; then
  APP_ROOT="$DEPLOY_PATH"
elif [ -n "${APP_ROOT:-}" ]; then
  :
else
  _src="${BASH_SOURCE[0]:-}"
  if [ -n "$_src" ] && [ "$_src" != "-" ]; then
    SCRIPT_DIR="$(cd "$(dirname "$_src")" && pwd)"
    APP_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
  else
    error_exit "Set DEPLOY_PATH (or APP_ROOT) when running via stdin, or run ./scripts/vps-deploy.sh from the repo"
  fi
fi

GIT_BRANCH="${DEPLOY_BRANCH:-${GIT_BRANCH:-main}}"
export NODE_ENV="${NODE_ENV:-production}"

cd "$APP_ROOT" || error_exit "Cannot cd to APP_ROOT: $APP_ROOT (wrong DEPLOY_PATH or permissions?)"

log "Working directory: $APP_ROOT"
log "Target branch: $GIT_BRANCH"

log "----- Environment (diagnostics) -----"
log "hostname: $(hostname 2>/dev/null || true)"
log "whoami: $(whoami 2>/dev/null || true)"
log "disk (app dir): $(df -h "$APP_ROOT" 2>/dev/null | tail -n 1 || echo 'df failed')"
command -v git >/dev/null 2>&1 && log "git: $(git --version 2>&1)" || log "git: NOT FOUND"
command -v node >/dev/null 2>&1 && log "node: $(node -v 2>&1)" || log "node: NOT FOUND"
command -v npm >/dev/null 2>&1 && log "npm: $(npm -v 2>&1)" || log "npm: NOT FOUND"
command -v pm2 >/dev/null 2>&1 && log "pm2: $(pm2 -v 2>&1 | head -n 1)" || log "pm2: NOT FOUND"
log "-------------------------------------"

if ! command -v git >/dev/null 2>&1; then
  error_exit "git is not installed"
fi
if ! command -v npm >/dev/null 2>&1; then
  error_exit "npm is not installed"
fi
if ! command -v pm2 >/dev/null 2>&1; then
  error_exit "pm2 is not installed (install with: sudo npm i -g pm2)"
fi

# Log a clear step label, then run the command. Do not wrap in if/|| so set -E + ERR trap
# still reports the real failing command (git/npm/pm2).
run_step() {
  local title="$1"
  shift
  log ">>> ${title}"
  "$@"
}

run_step "git fetch origin ${GIT_BRANCH}" git fetch origin "$GIT_BRANCH"

run_step "git checkout -B ${GIT_BRANCH} origin/${GIT_BRANCH}" git checkout -B "$GIT_BRANCH" "origin/$GIT_BRANCH"

run_step "git reset --hard origin/${GIT_BRANCH}" git reset --hard "origin/$GIT_BRANCH"

run_step "npm ci" npm ci

run_step "npm run build" npm run build

# Optional: slimmer node_modules for runtime (devDependencies not needed for `next start`).
# Uncomment if you want smaller disk use after a successful build.
# run_step "npm prune --omit=dev" npm prune --omit=dev

APP_NAME="jf-website"
ECOSYSTEM="${APP_ROOT}/ecosystem.config.js"

if [ ! -f "$ECOSYSTEM" ]; then
  error_exit "Missing ${ECOSYSTEM} (is this the repo root?)"
fi

if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  run_step "pm2 reload ${APP_NAME}" pm2 reload "$ECOSYSTEM" --only "$APP_NAME" --update-env
else
  run_step "pm2 start ${APP_NAME}" pm2 start "$ECOSYSTEM" --only "$APP_NAME"
fi

run_step "pm2 save" pm2 save

trap - ERR
log "Deployment finished successfully."
log "PM2 status (summary):"
pm2 describe "$APP_NAME" 2>/dev/null | head -n 25 || true
