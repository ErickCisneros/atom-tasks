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
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
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
  private router = inject(Router);
  private authService = inject(AuthService);
  private submitting = false;

  private fb = inject(NonNullableFormBuilder);

  public form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  get validatedForm() {
    return this.form.dirty && this.form.valid && !this.submitting;
  }

  onSubmit() {
    this.authService
      .getUser$(this.form.controls.email.value)
      .subscribe((user: User) => {
        if (!user.id) {
          this.createUserAndLogin(this.form.controls.email.value);
          return;
        }

        this.router.navigate(['/dashboard']);
      });
  }

  onSignUp() {
    const dialogRef = this.dialog.open(SignUpDialogComponent);

    dialogRef.afterClosed().subscribe((email: string) => {
      if (email) {
        this.createUserAndLogin(email);
      }
    });
  }

  private createUserAndLogin = (email: string): void => {
    const user: User = { email };

    this.authService.postUser$(user).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  };
}
