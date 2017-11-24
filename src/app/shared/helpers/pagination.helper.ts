import * as queryString from 'querystring';

export class PaginationHelper {
  offset: number = 0;
  limit: number = 10;
  total: number;

  constructor(data = null) {
    if (data) {
      if (data.offset) this.offset = data.offset;
      if (data.limit) this.limit = data.limit;
      if (data.total) this.total = data.total;
    }
  }

  getCurrentPage() {
    return this.offset / this.limit + 1;
  }

  setPage(page): any {
    this.offset = (page - 1) * this.limit;
    return this;
  }

  setTotal(total): void {
    this.total = total
  }

  getParams(): any {
    return { offset: this.offset, limit: this.limit };
  }

  stringify(): string {
    return queryString.stringify(this.getParams())
  }
}
