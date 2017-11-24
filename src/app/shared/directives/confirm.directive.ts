declare const $: any;
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appConfirm]',
})
export class ConfirmDirective {
  @Input() title: string;
  @Input() content: string;
  @Output('confirm-click') click: any = new EventEmitter();

  @HostListener('click', ['$event'])
  clicked(e) {
    $.confirm({
      title: this.title,
      content: this.content,
      buttons: {
        confirm: () => this.click.emit(),
        cancel: () => {
        },
      },
    });
  }
}
