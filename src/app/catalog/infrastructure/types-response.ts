import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of types.
 */
export interface TypesResponse extends BaseResponse {
  /**
   * The list of types returned by the API.
   */
  types: TypeResource[];
}

/**
 * Represents the API resource/DTO for a type.
 */
export interface TypeResource extends BaseResource {
  id: number;
  name: string;
  description: string;
}
