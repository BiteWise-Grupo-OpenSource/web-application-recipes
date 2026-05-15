import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of recipes.
 */
export interface RecipesResponse extends BaseResponse {
  /**
   * The list of recipes returned by the API.
   */
  recipes: RecipeResource[];
}

/**
 * Represents the API resource/DTO for a recipe.
 */
export interface RecipeResource extends BaseResource {
  id: number;
  title: string;
  description: string;
  urlInstructions: string;
  recipeTypeId: number;
  totalNutrientsId: number;
}
