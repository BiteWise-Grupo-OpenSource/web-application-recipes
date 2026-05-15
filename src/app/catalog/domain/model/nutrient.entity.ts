import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Nutrient implements BaseEntity {
  private _id: number;
  private _calories: number;
  private _carbs: number;
  private _proteins: number;
  private _fats: number;

  constructor(nutrient: {
    id: number;
    calories: number;
    carbs: number;
    proteins: number;
    fats: number;
  }) {
    this._id = nutrient.id;
    this._calories = nutrient.calories;
    this._carbs = nutrient.carbs;
    this._proteins = nutrient.proteins;
    this._fats = nutrient.fats;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get calories(): number {
    return this._calories;
  }
  set calories(value: number) {
    this._calories = value;
  }
  get carbs(): number {
    return this._carbs;
  }
  set carbs(value: number) {
    this._carbs = value;
  }
  get proteins(): number {
    return this._proteins;
  }
  set proteins(value: number) {
    this._proteins = value;
  }
  get fats(): number {
    return this._fats;
  }
  set fats(value: number) {
    this._fats = value;
  }
}
