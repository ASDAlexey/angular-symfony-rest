import { Injectable } from '@angular/core';

@Injectable()
export class RequestService {
  get countRequests(): number {
    return this._countRequests;
  }

  set countRequests(value: number) {
    this._countRequests = value;
    this.isDisabled = !!this._countRequests;
  }

  private _countRequests: number = 0;

  public isDisabled: boolean = false;
}
