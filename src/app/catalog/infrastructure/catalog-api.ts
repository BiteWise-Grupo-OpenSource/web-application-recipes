import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
//import { Course } from '../domain/model/course.entity';
import { Category } from '../domain/model/category.entity';
import { HttpClient } from '@angular/common/http';
//import { CoursesApiEndpoint } from './courses-api-endpoint';
import { CategoriesApiEndpoint } from './categories-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogApi extends BaseApi {
 // private readonly coursesEndpoint: CoursesApiEndpoint;
  private readonly categoriesEndpoint: CategoriesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    //this.coursesEndpoint = new CoursesApiEndpoint(http);
    this.categoriesEndpoint = new CategoriesApiEndpoint(http);
  }

  /**
   * Retrieves all courses from the API.
   * @returns An Observable for an array of Course objects.
   */


  /**
   * Retrieves a single course by ID.
   * @param id - The ID of the course.
   * @returns An Observable of the Course object.
   */


  /**
   * Creates a new course.
   * @param course - The course to create.
   * @returns An Observable of the created Course object.
   */

  /**
   * Updates an existing course.
   * @param course - The course to update.
   * @returns An Observable of the updated Course object.
   */


  /**
   * Deletes a course by ID.
   * @param id - The ID of the course to delete.
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
}
