import mongoose from "mongoose";

const GenreShema = new mongoose.Schema({
  name: { type: String, required: true },
});

const genreModel = mongoose.model("Genre", GenreShema);
export default genreModel;
