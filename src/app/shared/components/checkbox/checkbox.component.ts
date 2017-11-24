import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { SharedConstants } from '../../shared.constant';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() submitted: boolean = false;
  @Input() form: FormGroup;
  @Input() control;
  @Input() label: string;
  @Input() linkText: string;
  @Input() link: string;

  ASSETS_URL: string = SharedConstants.ASSETS_URL;
  uniqId: string = _.uniqueId('checkbox');
}

