import { AbstractModel } from '../shared/model/abstract.model';

export class ProductModel extends AbstractModel {
  id: number;
  name: string;
  price: string;
  description: string;
  color: string;
  year: string;
  updatedAt: string;
  createdAt: string;

  constructor(data) {
    super();
    if (data.id) this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.color = data.color;
    this.year = data.year;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }
}
