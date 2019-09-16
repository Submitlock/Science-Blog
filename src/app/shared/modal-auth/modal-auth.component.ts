import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { toggleModal } from 'src/app/animations/animations';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css'],
  animations: [ toggleModal ]
})
export class ModalAuthComponent implements OnInit {

  constructor() { }

  @Output() toggleModal = new EventEmitter<boolean>();
  @Input() showModal: boolean;

  ngOnInit() {
  }

  onHideModal(event: Event) {
    if (event) {
      const el = event.target as HTMLElement;
      if (el.classList.contains('w-100') ) {
        this.toggleModal.emit(false);
      }
    } else {
      this.toggleModal.emit(false);
    }
  }

}
