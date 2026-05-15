import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Ingredient } from '../domain/model/ingredient.entity';
import { IngredientsResponse, IngredientResource } from './ingredients-response';
import { Category } from '../domain/model/category.entity';
import { Nutrient } from '../domain/model/nutrient.entity';

export class IngredientAssembler implements BaseAssembler<Ingredient, IngredientResource, IngredientsResponse> {
  toEntitiesFromResponse(response: IngredientsResponse): Ingredient[] {
    return response.ingredients.map((resource) => this.toEntityFromResource(resource as IngredientResource));
  }

  toEntityFromResource(resource: IngredientResource): Ingredient {
    return new Ingredient({
      id: resource.id,
      name: resource.name,
      nutrientsId: resource.nutrientsId,
      categoryId: resource.categoryId,
      nutrient: resource.nutrient ? new Nutrient({
        id: resource.nutrient.id,
        calories: resource.nutrient.calories,
        carbs: resource.nutrient.carbs,
        proteins: resource.nutrient.proteins,
        fats: resource.nutrient.fats,
      }) : null,
      category: resource.category ? new Category({ id: resource.category.id, name: resource.category.name }) : null,
    });
  }

  toResourceFromEntity(entity: Ingredient): IngredientResource {
    return {
      id: entity.id,
      name: entity.name,
      nutrientsId: entity.nutrientsId,
      categoryId: entity.categoryId,
      nutrient: entity.nutrient ? {
        id: entity.nutrient.id,
        calories: entity.nutrient.calories,
        carbs: entity.nutrient.carbs,
        proteins: entity.nutrient.proteins,
        fats: entity.nutrient.fats,
      } : undefined,
      category: entity.category ? { id: entity.category.id, name: entity.category.name } : undefined,
    } as IngredientResource;
  }
}
