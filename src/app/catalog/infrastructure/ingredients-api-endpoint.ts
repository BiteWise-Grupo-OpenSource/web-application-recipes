import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Ingredient } from '../domain/model/ingredient.entity';
import { IngredientsResponse, IngredientResource } from './ingredients-response';
import { IngredientAssembler } from './ingredient-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class IngredientsApiEndpoint extends BaseApiEndpoint<
  Ingredient,
  IngredientResource,
  IngredientsResponse,
  IngredientAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderIngredientsEndpointPath}`,
      new IngredientAssembler(),
    );
  }
}
