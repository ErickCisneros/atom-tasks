import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inside-container',
  standalone: true,
  imports: [],
  templateUrl: './inside-container.component.html',
  styleUrl: './inside-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsideContainerComponent {}
