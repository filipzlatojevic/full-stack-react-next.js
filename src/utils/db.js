import mongoose from "mongoose";

const connect = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;

// let isConnected = false;

// export const connect = async () => {
//   mongoose.set("strictQuery", true);

//   if (isConnected) {
//     console.log("Already connected to the database.");
//     return;
//   }

//   try {
//     await mongoose.connect(process.env.MONGO, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//     console.log("MongoDB connected successfully.");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     isConnected = false;
//   }
// };
