import * as queryString from 'querystring';

export class PaginationHelper {
  offset: number = 0;
  limit: number = 5;
  count: number;

  static create(data = null) {
    return new this(data);
  }

  constructor(data = null) {
    if (data) {
      if (data.offset) this.offset = data.offset;
      if (data.limit) this.limit = data.limit;
      if (data.count) this.count = data.count;
    }
  }

  getCurrentPage() {
    return this.offset / this.limit + 1;
  }

  setPage(page): PaginationHelper {
    this.offset = (page - 1) * this.limit;
    return this;
  }

  setCount(count): void {
    this.count = count;
    if (this.getCurrentPage() * this.limit - this.count > this.limit) {
      this.setPage(Math.floor(this.count / this.limit) + 1);
    }
  }

  getParams(): any {
    return { offset: this.offset, limit: this.limit };
  }

  stringify(): string {
    return queryString.stringify(this.getParams());
  }
}
