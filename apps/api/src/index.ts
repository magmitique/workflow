import { loadEnv } from './config/env.js';
import { buildApp } from './app.js';

async function start() {
  const config = loadEnv();
  const app = await buildApp({ config });

  try {
    await app.listen({ port: config.PORT, host: config.HOST });
    app.log.info(`Server running on http://${config.HOST}:${config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
