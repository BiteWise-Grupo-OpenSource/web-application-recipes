import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Type } from '../domain/model/type.entity';
import { TypesResponse, TypeResource } from './types-response';

export class TypeAssembler implements BaseAssembler<
  Type,
  TypeResource,
  TypesResponse
> {
  /**
   * Converts a TypesResponse to an array of Type entities.
   * @param response - The API response containing types.
   * @returns An array of Type entities.
   */
  toEntitiesFromResponse(response: TypesResponse): Type[] {
    return response.types.map((resource) =>
      this.toEntityFromResource(resource as TypeResource),
    );
  }

  /**
   * Converts a TypeResource to a Type entity.
   * @param resource - The resource to convert.
   * @returns The converted Type entity.
   */
  toEntityFromResource(resource: TypeResource): Type {
    return new Type({
      id: resource.id,
      name: resource.name,
      description: resource.description,
    });
  }

  /**
   * Converts a Type entity to a TypeResource.
   * @param entity - The entity to convert.
   * @returns The converted TypeResource.
   */
  toResourceFromEntity(entity: Type): TypeResource {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    } as TypeResource;
  }
}
