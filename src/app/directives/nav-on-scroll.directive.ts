import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appNavOnScroll]'
})
export class NavOnScrollDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('document:scroll', ['$event'])
  onScroll(event: Event) {
    if (window.pageYOffset > 100) {
      this.renderer.addClass(this.elementRef.nativeElement, 'shadow');
    }
    if (window.pageYOffset === 0) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'shadow');
    }
  }

}
