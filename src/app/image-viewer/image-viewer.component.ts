import { Component, Input, AfterViewInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css',
})
// export class ImageViewerComponent implements OnInit, AfterViewInit {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x1: number; y1: number; x2: number; y2: number }[] =
//     [];
//   canvas: HTMLCanvasElement | null = null;
//   context: CanvasRenderingContext2D | null = null;

//   ngOnInit(): void {
//     // Initialize canvas and context
//     this.canvas = document.getElementById(
//       'imageCanvas'
//     ) as HTMLCanvasElement | null;
//     this.context = this.canvas?.getContext('2d') || null;
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.drawLines();
//   }

//   // drawLines(): void {
//   //   const image = document.getElementById('imageElement') as HTMLImageElement;
//   //   const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
//   //   const context = canvas?.getContext('2d');

//   //   if (image && context) {
//   //     canvas.width = image.width;
//   //     canvas.height = image.height;
//   //     context.clearRect(0, 0, canvas.width, canvas.height);

//   //     this.coordinates.forEach((coord) => {
//   //       context.beginPath();
//   //       context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Semi-transparent fill color
//   //       context.fillRect(
//   //         coord.x1,
//   //         coord.y1,
//   //         coord.x2 - coord.x1,
//   //         coord.y2 - coord.y1
//   //       ); // Draw filled rectangle
//   //       context.strokeStyle = 'red';
//   //       context.lineWidth = 2;
//   //       context.strokeRect(
//   //         coord.x1,
//   //         coord.y1,
//   //         coord.x2 - coord.x1,
//   //         coord.y2 - coord.y1
//   //       ); // Draw rectangle border
//   //       context.stroke();
//   //     });
//   //   }
//   // }
//   drawLines(): void {
//     const image = document.getElementById('imageElement') as HTMLImageElement;
//     const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
//     const context = canvas?.getContext('2d');

//     if (image && context) {
//       canvas.width = image.width;
//       canvas.height = image.height;
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       this.coordinates.forEach((coord) => {
//         context.beginPath();
//         context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Semi-transparent fill color
//         context.fillRect(
//           coord.x1,
//           coord.y1,
//           coord.x2 - coord.x1,
//           coord.y2 - coord.y1
//         ); // Draw filled rectangle
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.strokeRect(
//           coord.x1,
//           coord.y1,
//           coord.x2 - coord.x1,
//           coord.y2 - coord.y1
//         ); // Draw rectangle border
//         context.stroke();
//       });
//     }
//   }
// }
export class ImageViewerComponent implements AfterViewInit {
  @Input() imageSrc: string = '';
  @Input() coordinates: { x1: number; y1: number; x2: number; y2: number }[] =
    [];

  ngOnInit(): void {
    console.log('ngOnInit called');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.drawLines();
  }

  drawLines(): void {
    const image = document.getElementById('imageElement') as HTMLImageElement;
    const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (image && context) {
      canvas.width = image.width;
      canvas.height = image.height;
      context.clearRect(0, 0, canvas.width, canvas.height);

      this.coordinates.forEach((coord) => {
        context.beginPath();
        context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.strokeRect(
          coord.x1,
          coord.y1,
          coord.x2 - coord.x1,
          coord.y2 - coord.y1
        ); // Draw rectangle border
        context.stroke();
      });
    }
  }
}
