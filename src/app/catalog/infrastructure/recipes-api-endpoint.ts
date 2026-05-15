import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Recipe } from '../domain/model/recipe.entity';
import { RecipesResponse, RecipeResource } from './recipes-response';
import { RecipeAssembler } from './recipe-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class RecipesApiEndpoint extends BaseApiEndpoint<
  Recipe,
  RecipeResource,
  RecipesResponse,
  RecipeAssembler
> {
  /**
   * Creates an instance of RecipesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderRecipesEndpointPath}`,
      new RecipeAssembler(),
    );
  }
}
