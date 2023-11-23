import app from "./app";
import config from "./config";
import { connect } from "mongoose";

async function main() {
  // 4. Connect to MongoDB
  try {
    await connect(config.database_url as string);
    console.log("mongoose is connected");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
