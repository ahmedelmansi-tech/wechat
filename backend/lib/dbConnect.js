import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";
export const plugIn = async () => {
  // console.log("U_R_L", import.meta.url);
  // console.log("PATH", fileURLToPath(import.meta.url));
  // console.log("FILENAME", path.dirname(fileURLToPath(import.meta.url)));
  // console.log("RESOLVE", path.resolve());

  try {
    const conn = await mongoose.connect(process.env.VITE_MONGODB_URL);
    console.log(`DB_HOST : // ${conn.connection.host}`.bgGreen.bold);
  } catch (error) {
    console.warn("ERROR WHILE CONNECTION DB //".red, error.message);
    process.exit(1);
  }
};
