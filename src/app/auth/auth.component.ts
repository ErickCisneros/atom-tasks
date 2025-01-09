import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OutsideContainerComponent } from '../layout/components/outside-container/outside-container.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, OutsideContainerComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthComponent {}
