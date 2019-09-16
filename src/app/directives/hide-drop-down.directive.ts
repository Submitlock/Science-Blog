import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHideDropDown]'
})
export class HideDropDownDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  showDropDown = false;
  dropDownDiv: HTMLElement = null;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    const element = event.target as HTMLElement;
    const clickOnBtn: boolean = element.classList.contains('dropdown-toggle');
    if (clickOnBtn) {
      this.dropDownDiv = this.renderer.nextSibling(element);
      if (this.showDropDown) {
        this.renderer.removeClass(this.dropDownDiv, 'show');
        this.showDropDown = false;
      } else {
        this.renderer.addClass(this.dropDownDiv, 'show');
        this.showDropDown = true;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    const element = event.target as HTMLElement;
    const clickOnBtn: boolean = element.classList.contains('dropdown-toggle');
    if (!clickOnBtn && this.showDropDown) {
      this.renderer.removeClass(this.dropDownDiv, 'show');
      this.showDropDown = false;
    }
  }
}
