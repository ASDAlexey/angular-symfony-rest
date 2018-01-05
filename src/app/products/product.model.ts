import { get } from 'lodash';
import { AbstractModel } from '../shared/model/abstract.model';

export class ProductModel extends AbstractModel {
  id?: number;
  name: string;
  price: string;
  description: string;
  color: string;
  year: string;
  image: string;
  updatedAt: string;
  createdAt: string;

  constructor(data) {
    super();
    if (get(data, 'id')) this.id = data.id;
    this.name = get(data, 'name');
    this.price = get(data, 'price');
    this.description = get(data, 'description');
    this.color = get(data, 'color');
    this.year = get(data, 'year');
    this.image = get(data, 'image');
    this.updatedAt = get(data, 'updatedAt');
    this.createdAt = get(data, 'createdAt');
  }
}
