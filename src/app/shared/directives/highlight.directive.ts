import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
// Attribute directive example using HostListener + Renderer2.
export class HighlightDirective {
  @Input() appHighlight = '#e8f3ff';

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'backgroundColor');
  }
}
