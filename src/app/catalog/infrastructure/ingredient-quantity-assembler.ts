import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { IngredientQuantity } from '../domain/model/ingredient-quantity.entity';
import { IngredientQuantitiesResponse, IngredientQuantityResource } from './ingredient-quantities-response';
import { Ingredient } from '../domain/model/ingredient.entity';
import { Recipe } from '../domain/model/recipe.entity';

export class IngredientQuantityAssembler implements BaseAssembler<IngredientQuantity, IngredientQuantityResource, IngredientQuantitiesResponse> {
  toEntitiesFromResponse(response: IngredientQuantitiesResponse): IngredientQuantity[] {
    return response.ingredientQuantities.map((r) => this.toEntityFromResource(r as IngredientQuantityResource));
  }

  toEntityFromResource(resource: IngredientQuantityResource): IngredientQuantity {
    return new IngredientQuantity({
      id: resource.id,
      recipeId: resource.recipeId,
      ingredientId: resource.ingredientId,
      quantity: resource.quantity,
      ingredient: resource.ingredient
        ? new Ingredient({
            id: resource.ingredient.id,
            name: resource.ingredient.name,
            nutrientsId: (resource.ingredient as any).nutrientsId ?? 0,
            categoryId: (resource.ingredient as any).categoryId ?? 0,
          })
        : null,
      recipe: resource.recipe
        ? new Recipe({
            id: resource.recipe.id,
            title: (resource.recipe as any).title ?? '',
            description: (resource.recipe as any).description ?? '',
            urlInstructions: (resource.recipe as any).urlInstructions ?? '',
            recipeTypeId: (resource.recipe as any).recipeTypeId ?? 0,
            totalNutrientsId: (resource.recipe as any).totalNutrientsId ?? 0,
          })
        : null,
    });
  }

  toResourceFromEntity(entity: IngredientQuantity): IngredientQuantityResource {
    return {
      id: entity.id,
      recipeId: entity.recipeId,
      ingredientId: entity.ingredientId,
      quantity: entity.quantity,
      ingredient: entity.ingredient
        ? {
            id: entity.ingredient.id,
            name: entity.ingredient.name,
            nutrientsId: entity.ingredient.nutrientsId,
            categoryId: entity.ingredient.categoryId,
          }
        : undefined,
      recipe: entity.recipe
        ? {
            id: entity.recipe.id,
            title: entity.recipe.title,
            description: entity.recipe.description,
            urlInstructions: entity.recipe.urlInstructions,
            recipeTypeId: entity.recipe.recipeTypeId,
            totalNutrientsId: entity.recipe.totalNutrientsId,
          }
        : undefined,
    } as IngredientQuantityResource;
  }
}
