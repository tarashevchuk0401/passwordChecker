import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChecker]',
  standalone: true,
})
export class CheckerDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value.trim();

    const hasLetters = /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(inputValue);
    const hasDigits = /\d/.test(inputValue);
    const hasSymbols = /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9]/.test(inputValue);

    if (hasDigits || hasLetters || hasSymbols) {
      this.setStatusColor(0, 'red');
      this.setStatusColor(1, 'gray');
      this.setStatusColor(2, 'gray');
    }

    if (
      (hasLetters && hasDigits) ||
      (hasDigits && hasSymbols) ||
      (hasLetters && hasSymbols)
    ) {
      this.setStatusColor(0, 'yellow');
      this.setStatusColor(1, 'yellow');
      this.setStatusColor(2, 'gray');
    }

    if (hasLetters && hasDigits && hasSymbols) {
      this.setStatusColor(0, 'green');
      this.setStatusColor(1, 'green');
      this.setStatusColor(2, 'green');
    }

    if (inputValue.length < 8) {
      this.setStatusColor(0, 'red');
      this.setStatusColor(1, 'red');
      this.setStatusColor(2, 'red');
    }
    if (inputValue.length === 0) {
      this.setStatusColor(0, 'gray');
      this.setStatusColor(1, 'gray');
      this.setStatusColor(2, 'gray');
    }
  }

  setStatusColor(number: number, color: string): void {
    const section_container: HTMLElement | null =
      this.el.nativeElement.parentElement.querySelector('.section_container');

    this.renderer.setStyle(
      section_container?.childNodes[number],
      'background-color',
      color
    );
  }
}
