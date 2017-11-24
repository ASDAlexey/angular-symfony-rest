import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ReceiptTemplatesModel } from '../../accounting/models/receipt-templates.model';
import { Type } from '../../accounting/components/fill/fill-query-constructor';
import * as _ from 'lodash';

@Pipe({
  name: 'receiptTemplateFilter',
})
@Injectable()
export class ReceiptTemplateFilter implements PipeTransform {
  transform(list: ReceiptTemplatesModel[], search: string, type: Type): ReceiptTemplatesModel[] {
    if (!search) {
      return list.filter(item => (item.type === type));
    } else {
      if (list) {
        return list.filter((item) => {
          return (_.includes(item.name.toLowerCase(), _.escape(search.toLowerCase()) || _.includes(item.description.toLowerCase(), _.escape(search.toLowerCase())))) && item.type === type;
        })
      } else return [];
    }
  }
}
