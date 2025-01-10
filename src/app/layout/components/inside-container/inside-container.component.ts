import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-inside-container',
  standalone: true,
  imports: [ToolbarComponent, FooterComponent],
  templateUrl: './inside-container.component.html',
  styleUrl: './inside-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsideContainerComponent {}
