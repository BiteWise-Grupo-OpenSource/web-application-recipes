import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { IngredientQuantity } from '../domain/model/ingredient-quantity.entity';
import { IngredientQuantitiesResponse, IngredientQuantityResource } from './ingredient-quantities-response';
import { IngredientQuantityAssembler } from './ingredient-quantity-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class IngredientQuantitiesApiEndpoint extends BaseApiEndpoint<
  IngredientQuantity,
  IngredientQuantityResource,
  IngredientQuantitiesResponse,
  IngredientQuantityAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderIngredientQuantitiesEndpointPath}`,
      new IngredientQuantityAssembler(),
    );
  }
}
