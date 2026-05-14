import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Type } from '../domain/model/type.entity';
import { TypesResponse, TypeResource } from './types-response';
import { TypeAssembler } from './type-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class TypesApiEndpoint extends BaseApiEndpoint<
  Type,
  TypeResource,
  TypesResponse,
  TypeAssembler
> {
  /**
   * Creates an instance of TypesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderTypesEndpointPath}`,
      new TypeAssembler(),
    );
  }
}
