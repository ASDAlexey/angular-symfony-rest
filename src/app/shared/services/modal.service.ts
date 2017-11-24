import * as _ from 'lodash';
import { ModalComponent } from '../components/modal/modal.component';

export class ModalService {
  private modals: any[] = [];

  private findModal(el: ModalComponent) {
    return _.find(this.modals, item => (item.id === el.id));
  }

  add(modal: ModalComponent) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(el: ModalComponent) {
    // remove modal from array of active modals
    this.modals = _.without(this.modals, this.findModal(el));
  }

  modal(el: ModalComponent, data: any | null) {
    el.data = data;
    return this.findModal(el);
  }

  open(el: ModalComponent, data: any) {
    this.modal(el, data).open();
  }

  close(el: ModalComponent, data: any) {
    this.modal(el, data).close();
  }

  closeAll() {
    if (this.modals.length) this.modals.forEach(modal => (this.close(modal, null)));
  }
}
