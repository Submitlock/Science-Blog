import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { toggleModal } from 'src/app/animations/animations';
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../features/auth/store/auth.reducer';
import * as fromAuthActions from '../../features/auth/store/auth.actions';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.css'],
  animations: [ toggleModal ]
})
export class ModalAuthComponent implements OnInit {

  constructor(private renderer: Renderer2, private store: Store<{authState: fromAuthStore.State}>) { }

  @Output() toggleModal = new EventEmitter<boolean>();
  @Input() showModal: boolean;
  @ViewChild('card', {static: false}) card: ElementRef;
  error: string;

  ngOnInit() {
    this.store.select('authState').subscribe( res => {
      this.error = res.error;
    });
  }

  onHideModal(event: Event) {
    if (event) {
      const el = event.target as HTMLElement;
      if (el.classList.contains('w-100') ) {
        this.toggleModal.emit(false);
        this.store.dispatch(new fromAuthActions.ClearError());
      }
    } else {
      this.toggleModal.emit(false);
      this.store.dispatch(new fromAuthActions.ClearError());
    }
  }

  changeToSignUp() {
    this.store.dispatch(new fromAuthActions.ClearError());
    this.renderer.addClass(this.card.nativeElement, 'right-panel-active');
  }
  changeToLogIn() {
    this.store.dispatch(new fromAuthActions.ClearError());
    this.renderer.removeClass(this.card.nativeElement, 'right-panel-active');
  }

}
