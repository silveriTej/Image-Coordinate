import { Component } from '@angular/core';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { CoordinateInputComponent } from '../coordinate-input/coordinate-input.component';
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ImageViewerComponent, CoordinateInputComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  imageSrc = 'test.jpeg';
  coordinates: { x1: number; y1: number; x2: number; y2: number }[] = [];

  onCoordinatesChanged(
    coordinates: { x1: number; y1: number; x2: number; y2: number }[]
  ): void {
    this.coordinates = coordinates;
  }
}
