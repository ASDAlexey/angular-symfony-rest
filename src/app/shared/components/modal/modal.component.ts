import { Component, ElementRef, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})

export class ModalComponent implements OnInit, OnDestroy {
  private element: any;
  data: any = {};
  id: string = _.uniqueId('modal-');
  @Output() onOutsideClose = new EventEmitter<any>();

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    const backgroundCLick = (e: any) => {
      const target = e.target;
      const closes = target.closest('.modal-background');
      if (closes && !closes.length) this.close();
    };

    this.element.addEventListener('click', backgroundCLick.bind(this));
    this.element.setAttribute('id', this.id);

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.querySelector('.app-modal').classList.add('open');
  }

  // close modal
  close(): void {
    this.data = null;
    this.element.querySelector('.app-modal').classList.remove('open');
    this.onOutsideClose.emit();
  }
}
