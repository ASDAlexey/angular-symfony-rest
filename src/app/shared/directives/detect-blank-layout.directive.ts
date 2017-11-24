import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appDetectBlankLayout]',
})
export class DetectBlankLayoutDirective implements OnInit, OnDestroy {
  ngOnInit() {
    document.querySelector('body').classList.add('gray-bg');
  }

  ngOnDestroy() {
    document.querySelector('body').classList.remove('gray-bg');
  }
}
