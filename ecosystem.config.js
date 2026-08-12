// PM2 process definition, used by scripts/vps-deploy.sh on the server.
// Runs `next start` on port 3001 via the Next binary directly, matching the
// project's npm scripts. 3001 is what nginx proxies to: do not use 3000.
module.exports = {
  apps: [
    {
      name: 'jf-website',
      // Next 16 requires Node >= 20.9. PM2 remembers the interpreter from
      // whenever the process was created, and `pm2 restart` ignores any later
      // `nvm use`, so this must be pinned explicitly. The old process 13 was
      // stuck on Node v18.20.8, which silently crash-looped the app.
      // Override with PM2_NODE if the server's node path changes.
      interpreter: process.env.PM2_NODE || '/home/ubuntu/.nvm/versions/node/v22.12.0/bin/node',
      script: 'node_modules/next/dist/bin/next',
      // Port is passed as an argument as well as via env so it cannot be
      // silently overridden by a stale PORT in the PM2 process environment
      // (pm2 restart without --update-env keeps the old env).
      args: 'start --port 3001 --hostname 0.0.0.0',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
  ],
}
