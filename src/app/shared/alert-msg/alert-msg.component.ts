import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { slideInOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css'],
  animations: [slideInOut]
})
export class AlertMsgComponent implements OnInit {

  constructor() { }

  @Input() class: string;
  @Output() emitHideAlert = new EventEmitter();
  hideAlert = false;

  ngOnInit() {
  }

  onHideAlert() {
    this.hideAlert = true;
    this.emitHideAlert.emit();
  }
}
