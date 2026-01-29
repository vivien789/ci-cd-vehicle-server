import * as dotenv from 'dotenv';
dotenv.config();

import { connectDb, dbConfigFromEnv } from "../db/database";
import { setupApp } from "./app";

async function main() {
  let port = 8081;

  if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }

  const db = await connectDb(dbConfigFromEnv());

  setupApp(db as any).listen(port, () => {
    console.log(`Server is running on port ${port.toString()}`);
  })
}

main().catch((e: unknown) => { console.error(`Something went wrong ${e as string}`); });
