import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-outside-images',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './outside-images.component.html',
  styleUrl: './outside-images.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutsideImagesComponent {}
