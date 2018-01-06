import { Injectable } from '@angular/core';

@Injectable()
export class SharedConstants {
  static PROTOCOL: string = document.location.protocol;
  static HOST: string = document.location.host;
  static DOMAIN_URL: string = SharedConstants.PROTOCOL + '//' + SharedConstants.HOST;
  private static isLocalhost: boolean = !!SharedConstants.DOMAIN_URL.match(/localhost:4200/);
  static ASSETS_URL: string = `${SharedConstants.DOMAIN_URL + '/assets'}`;
  static API_URL: string =
    SharedConstants.isLocalhost ?
      `https://api.symfony-rest.local` :
      SharedConstants.DOMAIN_URL.replace(
        `${SharedConstants.PROTOCOL}//`,
        `${SharedConstants.PROTOCOL}//api.`,
      );
  static STUB_URL: string = `${SharedConstants.ASSETS_URL}/stub`;
}
