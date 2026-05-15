import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Nutrient } from '../domain/model/nutrient.entity';
import { NutrientsResponse, NutrientResource } from './nutrients-response';
import { NutrientAssembler } from './nutrient-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class NutrientsApiEndpoint extends BaseApiEndpoint<
  Nutrient,
  NutrientResource,
  NutrientsResponse,
  NutrientAssembler
> {
  /**
   * Creates an instance of NutrientsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderNutrientsEndpointPath}`,
      new NutrientAssembler(),
    );
  }
}
