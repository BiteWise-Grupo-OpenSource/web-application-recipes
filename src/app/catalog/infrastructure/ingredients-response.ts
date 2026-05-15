import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { CategoryResource } from './categories-response';
import { NutrientResource } from './nutrients-response';

/** API response for ingredients */
export interface IngredientsResponse extends BaseResponse {
  ingredients: IngredientResource[];
}

export interface IngredientResource extends BaseResource {
  id: number;
  name: string;
  nutrientsId: number;
  categoryId: number;
  nutrient?: NutrientResource;
  category?: CategoryResource;
}
