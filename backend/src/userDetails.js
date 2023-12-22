import mongoose from "mongoose";

// mongoose
//     .connect("mongodb://localhost:27017/LoginSignUpTutorial")
//     .then(() => {
//         console.log("mongodb connected");
//     })
//     .catch(() => {
//         console.log("failed to connect");
//     });



// export default collections;
const UserDetailsScehma = new mongoose.Schema(
    {
        userName: String,
        email: { type: String, unique: true },
        password: String,
        isAgree: Boolean
    },
    {
      collection: "UserInfo",
    }
  );
  
  mongoose.model("UserInfo", UserDetailsScehma);