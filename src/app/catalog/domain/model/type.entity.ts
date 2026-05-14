import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Type implements BaseEntity {
  private _id: number;
  private _name: string;
  private _description: string;

  constructor(type: { id: number; name: string; description: string }) {
    this._id = type.id;
    this._name = type.name;
    this._description = type.description;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get description(): string {
    return this._description;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  set description(value: string) {
    this._description = value;
  }
}
