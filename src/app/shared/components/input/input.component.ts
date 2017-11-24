import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() submitted: boolean = false;
  @Input() form: FormGroup;
  @Input() control;
  @Input() placeholder?: string;
  @Input() type: string = 'text';
  @Input() errorsHide?: boolean = false;
  @Input() formGroupName;
  @Input() maxLength?;
  @Input() disabled? = false;
  @Input() currency?;
  @Input() label?: string;
  @Input() options? = {
    align: 'right',
    allowNegative: false,
    allowZero: true,
    decimal: '.',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: ',',
  };
}
