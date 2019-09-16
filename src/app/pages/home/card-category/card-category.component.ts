import { Component, OnInit, Input } from '@angular/core';
import { viewCategoryAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.css'],
  animations: [viewCategoryAnimation]
})
export class CardCategoryComponent implements OnInit {

  constructor() { }

  @Input() color: string;
  @Input() img: string;
  linkColor: string;
  linkAnimationState = 'normal';

  ngOnInit() {
    this.linkColor = this.color.slice(0, this.color.length - 2);
  }

  onMouseEnter() {
    this.linkAnimationState = 'hovered';
  }
  onMouseLeave() {
    this.linkAnimationState = 'normal';
  }

}
