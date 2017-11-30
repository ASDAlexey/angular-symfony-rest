import { AbstractModel } from '../shared/model/abstract.model';

export class UserModel extends AbstractModel {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(data) {
    super();
    this.id = data.id;
    this.email = data.email;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
