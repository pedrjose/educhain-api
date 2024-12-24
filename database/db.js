import mongoose from "mongoose";



const connectDatabase = () => {
  console.log(`Wait: Connecting to the Database..`);

  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.cg0wy.mongodb.net/`
    )
    .then(() => console.log("\nDatabase Connected!"))
    .catch((error) => console.log(`\nCONNECTION ERROR: ${error}`));
};

export default connectDatabase;
