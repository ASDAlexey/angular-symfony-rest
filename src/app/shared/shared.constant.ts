import { Injectable } from '@angular/core';

@Injectable()
export class SharedConstants {
  public static DOMAIN_URL: string = document.location.protocol + '//' + document.location.host;
  private static isLocalhost: boolean = !!SharedConstants.DOMAIN_URL.match(/localhost:4200/);
  public static ASSETS_URL: string = `${SharedConstants.DOMAIN_URL + '/assets'}`;
  public static API_URL: string = SharedConstants.isLocalhost ? `https://api.symfony-rest.local` : SharedConstants.DOMAIN_URL.replace('app', 'api');
  public static STUB_URL: string = `${SharedConstants.ASSETS_URL}/stub`;
  public static LANGS: [string] = ['en', 'sv']
}
