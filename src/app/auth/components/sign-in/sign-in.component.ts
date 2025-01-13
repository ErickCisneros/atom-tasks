import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
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
import { Subscription } from 'rxjs';
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
export default class SignInComponent implements OnDestroy {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(NonNullableFormBuilder);
  private subs = new Subscription();

  form = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  get validatedForm() {
    return this.form.dirty && this.form.valid;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit() {
    const email = this.form.controls.email.value;
    this.subs.add(this.authService.getUser$(email).subscribe(this.getUser));
  }

  onSignUp() {
    const dialogRef = this.dialog.open(SignUpDialogComponent);
    this.subs.add(dialogRef.afterClosed().subscribe(this.getEmailFromDialog));
  }

  private getEmailFromDialog = (email: string) => {
    if (!email) {
      return;
    }

    this.createUserAndLogin(email);
  };

  private getUser = (user: User) => {
    if (!user.id) {
      const email = this.form.controls.email.value;
      this.createUserAndLogin(email);
      return;
    }

    this.router.navigate(['/dashboard']);
  };

  private createUserAndLogin = (email: string) => {
    const user: User = { email };
    this.subs.add(
      this.authService.postUser$(user).subscribe(this.getUserAndRedirect),
    );
  };

  private getUserAndRedirect = (user: User) => {
    if (!user.id) {
      return;
    }

    this.router.navigate(['/dashboard']);
  };
}
