import mongoose from "mongoose";

const GenreShema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const genreModel = mongoose.model("Genre", GenreShema);
export default genreModel;
