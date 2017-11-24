import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-radio-item',
  templateUrl: './radio-item.component.html',
  styleUrls: ['./radio-item.component.scss'],
})
export class RadioItemComponent {
  @Input() form: FormGroup;
  @Input() control;
  @Input() label: string;
  @Input() value: string;
  @Input() checked: boolean;
  @Input() switcher: boolean;

  uniqId: string = _.uniqueId('radio');
}
