import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { Nutrient } from './nutrient.entity';
import { Category } from './category.entity';

export class Ingredient implements BaseEntity {
  private _id: number;
  private _name: string;
  private _nutrientsId: number;
  private _categoryId: number;

  private _nutrient: Nutrient | null;
  private _category: Category | null;

  constructor(ingredient: {
    id: number;
    name: string;
    nutrientsId: number;
    categoryId: number;
    nutrient?: Nutrient | null;
    category?: Category | null;
  }) {
    this._id = ingredient.id;
    this._name = ingredient.name;
    this._nutrientsId = ingredient.nutrientsId;
    this._categoryId = ingredient.categoryId;
    this._nutrient = ingredient.nutrient ?? null;
    this._category = ingredient.category ?? null;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get nutrientsId(): number {
    return this._nutrientsId;
  }
  set nutrientsId(value: number) {
    this._nutrientsId = value;
  }

  get categoryId(): number {
    return this._categoryId;
  }
  set categoryId(value: number) {
    this._categoryId = value;
  }

  get nutrient(): Nutrient | null {
    return this._nutrient;
  }
  set nutrient(value: Nutrient | null) {
    this._nutrient = value;
  }

  get category(): Category | null {
    return this._category;
  }
  set category(value: Category | null) {
    this._category = value;
  }
}
