import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Directive({
  selector: '[appChecker]',
  standalone: true,
})
export class CheckerDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;

    const hasLetters = /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(inputValue);
    const hasDigits = /\d/.test(inputValue);
    const hasSymbols = /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9]/.test(inputValue);

    if (hasDigits || hasLetters || hasSymbols) {
      this.setColor(0, 'red');
      this.setColor(1, 'gray');
      this.setColor(2, 'gray');
    }

    if (
      (hasLetters && hasDigits) ||
      (hasLetters && hasSymbols) ||
      (hasDigits && hasSymbols) ||
      (hasLetters && hasSymbols)
    ) {
      this.setColor(0, 'yellow');
      this.setColor(1, 'yellow');
      this.setColor(2, 'gray');
    }

    if (hasLetters && hasDigits && hasSymbols) {
      this.setColor(0, 'green');
      this.setColor(1, 'green');
      this.setColor(2, 'green');
    }

    if (inputValue.length < 8) {
      this.setColor(0, 'red');
      this.setColor(1, 'red');
      this.setColor(2, 'red');
    }
    if (inputValue.length === 0) {
      this.setColor(0, 'gray');
      this.setColor(1, 'gray');
      this.setColor(2, 'gray');
    }
  }

  setColor(number: number, color: string): void {
    const section_container: HTMLElement | null =
      this.el.nativeElement.parentElement.querySelector('.section_container');

    this.renderer.setStyle(
      section_container?.childNodes[number],
      'background-color',
      color
    );
  }
}
