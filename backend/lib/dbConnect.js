import mongoose from "mongoose";

export const plugIn = async () => {
  try {
    const conn = await mongoose.connect(process.env.VITE_MONGODB_URL);
    console.log(`DB_HOST : // ${conn.connection.host}`.bgGreen.bold);
  } catch (error) {
    console.warn("ERROR WHILE CONNECTION DB //".red, error.message);
    process.exit(1);
  }
};
