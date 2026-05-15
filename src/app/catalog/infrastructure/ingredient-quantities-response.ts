import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { IngredientResource } from './ingredients-response';
import { RecipeResource } from './recipes-response';

export interface IngredientQuantitiesResponse extends BaseResponse {
  ingredientQuantities: IngredientQuantityResource[];
}

export interface IngredientQuantityResource extends BaseResource {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  ingredient?: IngredientResource;
  recipe?: RecipeResource;
}
