import { Component, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-control-btn',
  templateUrl: './add-control-btn.component.html',
  styleUrls: ['./add-control-btn.component.css']
})
export class AddControlBtnComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @Output() addElement = new EventEmitter<string>();

  ngOnInit() {
  }

  onAddElement(event: Event, type: string) {
    event.preventDefault();
    this.addElement.emit(type);
  }

}
