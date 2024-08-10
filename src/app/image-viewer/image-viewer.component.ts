import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css',
})
// // export class ImageViewerComponent implements OnInit, AfterViewInit {
// //   @Input() imageSrc: string = '';
// //   @Input() coordinates: { x1: number; y1: number; x2: number; y2: number }[] =
// //     [];
// //   canvas: HTMLCanvasElement | null = null;
// //   context: CanvasRenderingContext2D | null = null;

// //   ngOnInit(): void {
// //     // Initialize canvas and context
// //     this.canvas = document.getElementById(
// //       'imageCanvas'
// //     ) as HTMLCanvasElement | null;
// //     this.context = this.canvas?.getContext('2d') || null;
// //   }

// //   ngAfterViewInit(): void {
// //     console.log('ngAfterViewInit called');
// //     this.drawLines();
// //   }

// //   // drawLines(): void {
// //   //   const image = document.getElementById('imageElement') as HTMLImageElement;
// //   //   const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
// //   //   const context = canvas?.getContext('2d');

// //   //   if (image && context) {
// //   //     canvas.width = image.width;
// //   //     canvas.height = image.height;
// //   //     context.clearRect(0, 0, canvas.width, canvas.height);

// //   //     this.coordinates.forEach((coord) => {
// //   //       context.beginPath();
// //   //       context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Semi-transparent fill color
// //   //       context.fillRect(
// //   //         coord.x1,
// //   //         coord.y1,
// //   //         coord.x2 - coord.x1,
// //   //         coord.y2 - coord.y1
// //   //       ); // Draw filled rectangle
// //   //       context.strokeStyle = 'red';
// //   //       context.lineWidth = 2;
// //   //       context.strokeRect(
// //   //         coord.x1,
// //   //         coord.y1,
// //   //         coord.x2 - coord.x1,
// //   //         coord.y2 - coord.y1
// //   //       ); // Draw rectangle border
// //   //       context.stroke();
// //   //     });
// //   //   }
// //   // }
// //   drawLines(): void {
// //     const image = document.getElementById('imageElement') as HTMLImageElement;
// //     const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
// //     const context = canvas?.getContext('2d');

// //     if (image && context) {
// //       canvas.width = image.width;
// //       canvas.height = image.height;
// //       context.clearRect(0, 0, canvas.width, canvas.height);

// //       this.coordinates.forEach((coord) => {
// //         context.beginPath();
// //         context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Semi-transparent fill color
// //         context.fillRect(
// //           coord.x1,
// //           coord.y1,
// //           coord.x2 - coord.x1,
// //           coord.y2 - coord.y1
// //         ); // Draw filled rectangle
// //         context.strokeStyle = 'red';
// //         context.lineWidth = 2;
// //         context.strokeRect(
// //           coord.x1,
// //           coord.y1,
// //           coord.x2 - coord.x1,
// //           coord.y2 - coord.y1
// //         ); // Draw rectangle border
// //         context.stroke();
// //       });
// //     }
// //   }
// // }

//important for image fetching
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = [];

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.fetchAndRenderImage();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && !changes['coordinates'].firstChange) {
//       console.log(
//         'Coordinates received in ImageViewerComponent:',
//         this.coordinates
//       );
//       this.drawLinesOnCanvas();
//     }
//   }

//   fetchAndRenderImage(): void {
//     this.apiService.getImage(this.imageSrc).subscribe(
//       (blob) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (this.imageElement && this.imageElement.nativeElement) {
//             this.imageElement.nativeElement.src = reader.result as string;
//             this.setupCanvas();
//           }
//         };
//         reader.readAsDataURL(blob);
//       },
//       (error) => {
//         console.error('Error fetching image:', error);
//       }
//     );
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         this.initializeCanvas(canvas, image);
//         this.drawLinesOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.drawLinesOnCanvas();
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.width;
//     canvas.height = image.height;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       context.beginPath();
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;

//       if (this.coordinates.length > 0) {
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y);
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = [];
//   @Input() objectData: any[] = []; // Add this line to handle object_data

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && !changes['coordinates'].firstChange) {
//       console.log(
//         'Coordinates received in ImageViewerComponent:',
//         this.coordinates
//       );
//       this.drawLinesOnCanvas();
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       this.drawObjectDataOnCanvas(); // Call function to handle object_data
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         this.initializeCanvas(canvas, image);
//         this.drawLinesOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.drawLinesOnCanvas();
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.width;
//     canvas.height = image.height;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       context.beginPath();
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;

//       if (this.coordinates.length > 0) {
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y);
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.strokeStyle = 'blue'; // Different color for object data
//       context.lineWidth = 1;

//       this.objectData.forEach((object) => {
//         if (object && object['bbox']) {
//           const bbox = object['bbox'];
//           const coords = this.parseRoiBbox(bbox);
//           if (coords.length > 0) {
//             context.beginPath();
//             context.moveTo(coords[0].x, coords[0].y);

//             coords.forEach((coord, index) => {
//               if (index > 0) {
//                 context.lineTo(coord.x, coord.y);
//               }
//             });

//             context.closePath();
//             context.stroke();
//           }
//         }
//       });
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   private parseRoiBbox(bbox: string): { x: number; y: number }[] {
//     const points = bbox.split(';').filter((p) => p !== '');
//     const coordinates: { x: number; y: number }[] = [];

//     for (let i = 0; i < points.length; i += 2) {
//       const x = parseInt(points[i], 10);
//       const y = parseInt(points[i + 1], 10);
//       coordinates.push({ x, y });
//     }

//     return coordinates;
//   }
// }
export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() imageSrc: string = '';
  @Input() coordinates: { x: number; y: number }[] = [];
  @Input() objectData: any[] = []; // To handle object data

  @ViewChild('imageElement', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;
  @ViewChild('imageCanvas', { static: true })
  imageCanvas!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.setupCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinates'] && !changes['coordinates'].firstChange) {
      console.log(
        'Coordinates received in ImageViewerComponent:',
        this.coordinates
      );
      this.drawLinesOnCanvas();
    }

    if (changes['objectData'] && !changes['objectData'].firstChange) {
      console.log(
        'Object Data received in ImageViewerComponent:',
        this.objectData
      );
      this.drawObjectDataOnCanvas(); // Call function to handle object_data
    }
  }

  setupCanvas(): void {
    const image = this.imageElement.nativeElement;
    const canvas = this.imageCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (image && canvas && context) {
      image.onload = () => {
        this.initializeCanvas(canvas, image);
        this.drawLinesOnCanvas();
      };

      if (image.complete) {
        image.onload = null;
        this.initializeCanvas(canvas, image);
        this.drawLinesOnCanvas();
      }
    } else {
      console.error('Image or Canvas element not found.');
    }
  }

  initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  drawLinesOnCanvas(): void {
    const canvas = this.imageCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.strokeStyle = 'red';
      context.lineWidth = 2;

      if (this.coordinates.length > 0) {
        context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

        this.coordinates.forEach((coord, index) => {
          if (index > 0) {
            context.lineTo(coord.x, coord.y);
          }
        });

        context.lineTo(this.coordinates[0].x, this.coordinates[0].y);
        context.stroke();
      }
    } else {
      console.error('Canvas context is not available.');
    }
  }

  drawObjectDataOnCanvas(): void {
    const canvas = this.imageCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = 'blue'; // Different color for object data
      context.lineWidth = 1;

      this.objectData.forEach((object) => {
        if (object && object.bbox) {
          const { X, Y, W, H } = object.bbox;

          // Draw the bounding box on the canvas
          context.beginPath();
          context.rect(X, Y, W, H);
          context.strokeStyle = 'blue';
          context.lineWidth = 2;
          context.stroke();
          context.closePath();
        }
      });
    } else {
      console.error('Canvas context is not available.');
    }
  }
}
