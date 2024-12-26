import mongoose from "mongoose";

const username = "educhain";
const password = "LmT57k4qRC8zvK06";

const connectDatabase = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.cg0wy.mongodb.net/`
    )
    .then(() => console.log("Database Connected!"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
