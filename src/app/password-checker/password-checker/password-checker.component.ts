import { Component } from '@angular/core';
import { CheckerDirective } from '../../directives/checker.directive';
import { CommonModule } from '@angular/common';
// import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-password-checker',
  standalone: true,
  imports: [CheckerDirective, CommonModule],
  templateUrl: './password-checker.component.html',
  styleUrl: './password-checker.component.scss'
})
export class PasswordCheckerComponent {
  // All logic is in CheckerDirective
}
