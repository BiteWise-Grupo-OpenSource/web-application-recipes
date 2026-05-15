import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of nutrients.
 */
export interface NutrientsResponse extends BaseResponse {
  /**
   * The list of nutrients returned by the API.
   */
  nutrients: NutrientResource[];
}

/**
 * Represents the API resource/DTO for a nutrient.
 */
export interface NutrientResource extends BaseResource {
  id: number;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
}
