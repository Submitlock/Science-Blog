import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { toggleModal } from 'src/app/animations/animations';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css'],
  animations: [ toggleModal ]
})
export class ModalAuthComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @Output() toggleModal = new EventEmitter<boolean>();
  @Input() showModal: boolean;
  @ViewChild('card', {static: false}) card: ElementRef;

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

  changeToSignUp() {
    this.renderer.addClass(this.card.nativeElement, 'right-panel-active');
  }
  changeToLogIn() {
    this.renderer.removeClass(this.card.nativeElement, 'right-panel-active');
  }

}
