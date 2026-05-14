import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Type } from '../domain/model/type.entity';
import { Category } from '../domain/model/category.entity';
import { HttpClient } from '@angular/common/http';
import { TypesApiEndpoint } from './types-api-endpoint';
import { CategoriesApiEndpoint } from './categories-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogApi extends BaseApi {
  private readonly typesEndpoint: TypesApiEndpoint;
  private readonly categoriesEndpoint: CategoriesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.typesEndpoint = new TypesApiEndpoint(http);
    this.categoriesEndpoint = new CategoriesApiEndpoint(http);
  }

  /**
   * Retrieves all types from the API.
   * @returns An Observable for an array of Type objects.
   */

  /**
   * Retrieves a single type by ID.
   * @param id - The ID of the type.
   * @returns An Observable of the Type object.
   */

  /**
   * Creates a new type.
   * @param type - The type to create.
   * @returns An Observable of the created Type object.
   */

  /**
   * Updates an existing type.
   * @param type - The type to update.
   * @returns An Observable of the updated Type object.
   */

  /**
   * Deletes a type by ID.
   * @param id - The ID of the type to delete.
   * @returns An Observable of void.
   */

  /**
   * Retrieves all categories from the API.
   * @returns An Observable for an array of Category objects.
   */
  getCategories(): Observable<Category[]> {
    return this.categoriesEndpoint.getAll();
  }

  /**
   * Retrieves a single category by ID.
   * @param id - The ID of the category.
   * @returns An Observable of the Category object.
   */
  getCategory(id: number): Observable<Category> {
    return this.categoriesEndpoint.getById(id);
  }

  /**
   * Creates a new category.
   * @param category - The category to create.
   * @returns An Observable of the created Category object.
   */
  createCategory(category: Category): Observable<Category> {
    return this.categoriesEndpoint.create(category);
  }

  /**
   * Updates an existing category.
   * @param category - The category to update.
   * @returns An Observable of the updated Category object.
   */
  updateCategory(category: Category): Observable<Category> {
    return this.categoriesEndpoint.update(category, category.id);
  }

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   * @returns An Observable of void.
   */
  deleteCategory(id: number): Observable<void> {
    return this.categoriesEndpoint.delete(id);
  }

  getTypes(): Observable<Type[]> {
    return this.typesEndpoint.getAll();
  }

  /**
   * Retrieves a single type by ID.
   * @param id - The ID of the type.
   * @returns An Observable of the Type object.
   */
  getType(id: number): Observable<Type> {
    return this.typesEndpoint.getById(id);
  }

  /**
   * Creates a new type.
   * @param type - The type to create.
   * @returns An Observable of the created Type object.
   */
  createType(type: Type): Observable<Type> {
    return this.typesEndpoint.create(type);
  }

  /**
   * Updates an existing type.
   * @param type - The type to update.
   * @returns An Observable of the updated Type object.
   */
  updateType(type: Type): Observable<Type> {
    return this.typesEndpoint.update(type, type.id);
  }

  /**
   * Deletes a type by ID.
   * @param id - The ID of the type to delete.
   * @returns An Observable of void.
   */
  deleteType(id: number): Observable<void> {
    return this.typesEndpoint.delete(id);
  }
}
