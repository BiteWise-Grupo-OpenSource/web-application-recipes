import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Nutrient } from '../domain/model/nutrient.entity';
import { NutrientsResponse, NutrientResource } from './nutrients-response';

export class NutrientAssembler implements BaseAssembler<
  Nutrient,
  NutrientResource,
  NutrientsResponse
> {
  /**
   * Converts a NutrientsResponse to an array of Nutrient entities.
   * @param response - The API response containing nutrients.
   * @returns An array of Nutrient entities.
   */
  toEntitiesFromResponse(response: NutrientsResponse): Nutrient[] {
    return response.nutrients.map((resource) =>
      this.toEntityFromResource(resource as NutrientResource),
    );
  }

  /**
   * Converts a NutrientResource to a Nutrient entity.
   * @param resource - The resource to convert.
   * @returns The converted Nutrient entity.
   */
  toEntityFromResource(resource: NutrientResource): Nutrient {
    return new Nutrient({
      id: resource.id,
      calories: resource.calories,
      carbs: resource.carbs,
      proteins: resource.proteins,
      fats: resource.fats,
    });
  }

  /**
   * Converts a Nutrient entity to a NutrientResource.
   * @param entity - The entity to convert.
   * @returns The converted NutrientResource.
   */
  toResourceFromEntity(entity: Nutrient): NutrientResource {
    return {
      id: entity.id,
      calories: entity.calories,
      carbs: entity.carbs,
      proteins: entity.proteins,
      fats: entity.fats,
    } as NutrientResource;
  }
}
