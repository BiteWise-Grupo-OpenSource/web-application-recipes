import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Recipe } from '../domain/model/recipe.entity';
import { RecipesResponse, RecipeResource } from './recipes-response';

export class RecipeAssembler implements BaseAssembler<Recipe, RecipeResource, RecipesResponse> {
  /**
   * Converts a RecipesResponse to an array of Recipe entities.
   */
  toEntitiesFromResponse(response: RecipesResponse): Recipe[] {
    return response.recipes.map((resource) =>
      this.toEntityFromResource(resource as RecipeResource),
    );
  }

  toEntityFromResource(resource: RecipeResource): Recipe {
    return new Recipe({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      urlInstructions: resource.urlInstructions,
      recipeTypeId: resource.recipeTypeId,
      totalNutrientsId: resource.totalNutrientsId,
    });
  }

  toResourceFromEntity(entity: Recipe): RecipeResource {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      urlInstructions: entity.urlInstructions,
      recipeTypeId: entity.recipeTypeId,
      totalNutrientsId: entity.totalNutrientsId,
    } as RecipeResource;
  }
}
