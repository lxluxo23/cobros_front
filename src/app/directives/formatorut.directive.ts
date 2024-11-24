import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[formatorut]',
  standalone: true
})
export class FormatorutDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: InputEvent) {
    let value = this.el.nativeElement.value;
    value = value.replace(/[^\d]/g, '');
    if (value.length >= 2) {
      value = value.slice(0, -1) + '-' + value.slice(-1);
    }

    this.el.nativeElement.value = value;
  }

  @HostListener('blur')
  onBlur() {
    let value = this.el.nativeElement.value;
    if (value.length === 0) return;
    value = value.replace(/[^\d]/g, '');
    if (value.length >= 2) {
      value = value.slice(0, -1) + '-' + value.slice(-1);
    }
    this.el.nativeElement.value = value;
  }
}
