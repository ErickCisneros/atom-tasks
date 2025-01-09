import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FooterComponent } from '../footer/footer.component';
import { LogoComponent } from '../logo/logo.component';
import { OutsideImagesComponent } from '../outside-images/outside-images.component';

@Component({
  selector: 'app-outside-container',
  standalone: true,
  imports: [
    LogoComponent,
    FooterComponent,
    OutsideImagesComponent,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './outside-container.component.html',
  styleUrl: './outside-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutsideContainerComponent {}
