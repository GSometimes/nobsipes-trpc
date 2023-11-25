import axios from 'axios';
import * as cheerio from 'cheerio';

type Recipe = {
  name: string;
  image: string;
  ingredients: string[];
  directions: { [key: string]: string };
};

export async function getIngredients(url: string): Promise<Recipe> {
  try {
    let res = await axios.get(url);

    const $ = cheerio.load(res.data);

    let recipe: Recipe = {
      name: url.split('/').slice(-2, -1)[0].replace(/-/g, ' '),
      image: '',
      ingredients: [],
      directions: {},
    };

    recipe.image = $('.universal-image__image').data('src') as string;

    $('.mntl-structured-ingredients__list-item').each((i, el) => {
      recipe.ingredients.push($(el).text().trim());
    });

    $('.comp .mntl-sc-block .mntl-sc-block-html').each((i, el) => {
      recipe.directions[`Step ${i + 1}`] = $(el).text().trim();
    });

    return recipe;
  } catch (error) {
    console.error('Error scraping recipe:', error);
    throw error;
  }
}
