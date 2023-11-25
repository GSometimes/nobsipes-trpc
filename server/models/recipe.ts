// not sure what database? maybe mongo? idk might delete.
import mongoose, { Schema } from 'mongoose';

// define schema with some database when you choose one
// probably need unique identifier for url to check for duplicates?
const recipeSchema = new Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: String, // not required because some recipes might not have image?,
  ingredients: { type: [String], required: true },
  directions: { type: Object, required: true },
});

// need database for .model
const RecipeInfo = mongoose.model('RecipeInfo', recipeSchema);

export default RecipeInfo;
