import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as MobileDetect from 'mobile-detect';

@Directive({
  selector: '[appMd]',
})
export class MobileDetectDirective implements OnInit {
  ngOnInit() {
    const md = new MobileDetect(window.navigator.userAgent);
    const isMobile = md.mobile();
    const isTablet = md.tablet();
    const userAgent = md.userAgent();
    if (isMobile) {
      document.querySelector('html').classList.add('mobile');
    }
    if (isTablet) {
      document.querySelector('html').classList.add('tablet');
    }
    if (userAgent) {
      document.querySelector('html').classList.add(userAgent);
    }
  }
}
