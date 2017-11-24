import { Component, Input } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() btnType: string = 'submit';
  @Input() className: string = 'btn btn-primary';
  @Input() text: string = 'Send';
  @Input() disabled: boolean = false;


  constructor(public requestService: RequestService) {
  }
}

