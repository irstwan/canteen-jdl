import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {
  @Output() isFocusChange = new EventEmitter<boolean>();
  isFocus = false;

  @HostListener('focus') onFocus() {
    this.isFocus = true;
    this.isFocusChange.emit(this.isFocus);
  }

  @HostListener('blur') onBlur() {
    this.isFocus = false;
    this.isFocusChange.emit(this.isFocus);
  }
}
