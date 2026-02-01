import 'dotenv/config';

import { connectDb, dbConfigFromEnv } from "../db/database.js";
import { setupApp } from "./app.js";

async function main() {
  let port = 8083;

  if (process.env.PORT) {
    port = parseInt(process.env.PORT, 10);
  }
  const db = await connectDb(dbConfigFromEnv());
  console.log(db);

  setupApp(db as any).listen(port, () => {
    console.log(`Server is running on port ${port.toString()}`);
  })
}

main().catch((e: unknown) => { console.error(`Something went wrong ${e as string}`); });

