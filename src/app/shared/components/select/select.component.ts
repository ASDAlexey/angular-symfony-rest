import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() submitted: boolean = false;
  @Input() form: FormGroup;
  @Input() control;
  @Input() list?: [string | { value: string, text: string }];
  @Input() emptyOption: string;
  @Input() isObject?: boolean = false;
  @Input() value?: string = 'value';
  @Input() text?: string = 'text';
  @Input() label?: string;
}
