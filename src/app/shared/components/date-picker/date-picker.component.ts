import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() today: boolean = false;
  @Input() submitted: boolean = false;
  @Input() form: FormGroup;
  @Input() control;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() errorsHide?: boolean = false;
  @Input() options?: IMyDpOptions = {
    editableDateField: false,
    openSelectorOnInputClick: true,
    dateFormat: 'yyyy-mm-dd',
  };

  ngOnInit() {
    if (this.today) this.setTodayDate();
  }

  clearDate(): void {
    this.form.patchValue({ date: null });
  }

  setTodayDate() {
    const todayDate = new Date();
    const today = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    const currentDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };

    this.setDate({
      date: currentDate,
      jsdate: today,
    });
  }

  // set today default date
  setDate(date): void {
    this.form.patchValue({
      date,
    });
  }
}
