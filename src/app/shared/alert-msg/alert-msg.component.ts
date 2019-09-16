import { Component, OnInit, Input } from '@angular/core';
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
  hideAlert = false;

  ngOnInit() {
  }

}
