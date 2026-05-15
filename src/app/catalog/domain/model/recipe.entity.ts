import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Recipe implements BaseEntity {
  private _id: number;
  private _title: string;
  private _description: string;
  private _urlInstructions: string;
  private _recipeTypeId: number;
  private _totalNutrientsId: number;

  constructor(recipe: {
    id: number;
    title: string;
    description: string;
    urlInstructions: string;
    recipeTypeId: number;
    totalNutrientsId: number;
  }) {
    this._id = recipe.id;
    this._title = recipe.title;
    this._description = recipe.description;
    this._urlInstructions = recipe.urlInstructions;
    this._recipeTypeId = recipe.recipeTypeId;
    this._totalNutrientsId = recipe.totalNutrientsId;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get urlInstructions(): string {
    return this._urlInstructions;
  }
  set urlInstructions(value: string) {
    this._urlInstructions = value;
  }

  get recipeTypeId(): number {
    return this._recipeTypeId;
  }
  set recipeTypeId(value: number) {
    this._recipeTypeId = value;
  }

  get totalNutrientsId(): number {
    return this._totalNutrientsId;
  }
  set totalNutrientsId(value: number) {
    this._totalNutrientsId = value;
  }
}
