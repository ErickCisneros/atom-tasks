import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesEnum } from '../../types/messages.enum';

@Injectable({
  providedIn: 'root',
})
export class SnackbarsService {
  private snackBar = inject(MatSnackBar);

  openSnackbar(message: MessagesEnum) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
