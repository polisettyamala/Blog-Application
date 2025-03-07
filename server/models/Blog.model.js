import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ref: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
  },
  //   user: {
  //     id: {

  //     },
  //     name : {

  //     }
  //   }
});

export default mongoose.model("Blog", BlogSchema);
