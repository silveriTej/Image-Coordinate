import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParentComponent, ImageViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ImageCoordinate';
  imageSrc = 'test.jpeg'; // Provide the path to your image
  coordinates = [
    { x1: 50, y1: 60, x2: 150, y2: 100 },
    { x1: 200, y1: 200, x2: 300, y2: 300 },
    { x1: 2, y1: 10, x2: 28, y2: 45 },
    { x1: 200, y1: 200, x2: 300, y2: 300 },
  ];
}
