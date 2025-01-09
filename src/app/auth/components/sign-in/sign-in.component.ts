import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInComponent {
  private dialog = inject(MatDialog);
  private submitting = false;

  private fb = inject(NonNullableFormBuilder);

  public form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  get email() {
    return this.form.get('email');
  }

  get validatedForm() {
    return this.form.dirty && this.form.valid && !this.submitting;
  }

  enableLoading() {
    this.submitting = true;
  }

  disableLoading() {
    this.submitting = false;
  }

  onSubmit() {}

  onSignUp() {
    const dialogRef = this.dialog.open(SignUpDialogComponent);

    dialogRef.afterClosed().subscribe((email: string) => {
      if (email) {
        console.log(email);
      }
    });
  }
}
