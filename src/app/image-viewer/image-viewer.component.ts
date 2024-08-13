import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
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
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = [];
//   @Input() objectData: any[] = []; // To handle object data

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
//         if (object && object.bbox) {
//           const { H, W, X, Y } = object.bbox;

//           // Draw the bounding box on the canvas
//           context.beginPath();
//           context.rect(X, Y, W, H);
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//           context.closePath();
//         }
//       });
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

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
//         this.objectData[0]
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
//         this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
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

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
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
//       context.strokeStyle = 'blue'; // Color for bounding boxes
//       context.lineWidth = 2;

//       // this.objectData.forEach((object) => {
//       //   if (object && object.bbox) {
//       //     const { H, W, X, Y } = object.bbox;

//       //     // Draw the bounding box on the canvas
//       //     context.beginPath();
//       //     context.rect(X, Y, W, H);
//       //     context.stroke();
//       //     context.closePath();
//       //   }
//       // });
//       // } else {
//       //   console.error('Canvas context is not available.');
//       // }

//       const bboxData = this.objectData[0].bbox;

//       if (bboxData) {
//         const { X, Y, W, H } = bboxData;

//         // Draw the bounding box on the canvas
//         context.beginPath();
//         context.rect(X, Y, W, H);
//         context.strokeStyle = 'blue';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

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
//         this.objectData[0]
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
//         this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
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

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   // drawObjectDataOnCanvas(): void {
//   //   const canvas = this.imageCanvas.nativeElement;
//   //   const context = canvas.getContext('2d');

//   //   if (context) {
//   //     context.strokeStyle = 'blue'; // Color for bounding boxes
//   //     context.lineWidth = 2;

//   //     // Loop through all objects and draw their bounding boxes
//   //     // this.objectData.forEach((object) => {
//   //     //   if (object && object.bbox) {
//   //     //     const { H, W, X, Y } = object.bbox;

//   //     //     // Draw the bounding box on the canvas
//   //     //     context.beginPath();
//   //     //     context.rect(X, Y, W, H);
//   //     //     context.stroke();
//   //     //     context.closePath();
//   //     //   }
//   //     // });

//   //     const bboxData = this.objectData[0].bbox;

//   //     if (bboxData) {
//   //       const { X, Y, W, H } = bboxData;

//   //       // Draw the bounding box on the canvas
//   //       context.beginPath();
//   //       context.rect(X, Y, W, H);
//   //       context.strokeStyle = 'blue';
//   //       context.lineWidth = 2;
//   //       context.stroke();
//   //       context.closePath();
//   //     }
//   //   } else {
//   //     console.error('Canvas context is not available.');
//   //   }
//   // }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       // Clear the canvas before drawing new content
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // If coordinates are provided, draw them first
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }

//       // Get the image dimensions and canvas dimensions
//       const image = this.imageElement.nativeElement;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Adjust bounding boxes to fit within the canvas area defined by coordinates
//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           const { X, Y, W, H } = object.bbox;

//           // Apply scaling to the bounding box coordinates
//           const scaledX = X * scaleX;
//           const scaledY = Y * scaleY;
//           const scaledW = W * scaleX;
//           const scaledH = H * scaleY;

//           // Draw the bounding box on the canvas
//           if (this.isWithinCoordinates(scaledX, scaledY, scaledW, scaledH)) {
//             context.beginPath();
//             context.rect(scaledX, scaledY, scaledW, scaledH);
//             context.strokeStyle = 'blue';
//             context.lineWidth = 2;
//             context.stroke();
//             context.closePath();
//           }
//         }
//       });
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   isWithinCoordinates(
//     x: number,
//     y: number,
//     width: number,
//     height: number
//   ): boolean {
//     // This method should check if the bounding box is within the defined coordinates area
//     // Assuming coordinates define a closed shape, you need to implement this check based on your specific needs
//     // Placeholder logic for demonstration purposes
//     return true; // Replace this with actual implementation
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

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
//       if (this.imageLoaded) {
//         this.drawLinesOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         this.drawObjectDataOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear the canvas before drawing new content
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw existing lines
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }

//       // Get canvas dimensions
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;

//       // Check if image dimensions are correct
//       console.log(
//         `Image dimensions - Width: ${imageWidth}, Height: ${imageHeight}`
//       );
//       console.log(
//         `Canvas dimensions - Width: ${canvasWidth}, Height: ${canvasHeight}`
//       );

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Check scaling factors
//       console.log(`Scaling factors - X: ${scaleX}, Y: ${scaleY}`);

//       // Draw bounding boxes
//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           const { X, Y, W, H } = object.bbox;

//           // Apply scaling to bounding box coordinates
//           const scaledX = X * scaleX;
//           const scaledY = Y * scaleY;
//           const scaledW = W * scaleX;
//           const scaledH = H * scaleY;

//           // Check bounding box dimensions
//           console.log(
//             `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//           );

//           // Draw the bounding box on the canvas
//           context.beginPath();
//           context.rect(scaledX, scaledY, scaledW, scaledH);
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//           context.closePath();
//         }
//       });
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

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
//       if (this.imageLoaded) {
//         this.drawLinesOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         this.drawObjectDataOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         console.log('Image loaded successfully');
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       } else {
//         image.onerror = () => {
//           console.error('Error loading image');
//         };
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }

//       // Coordinates canvas dimensions
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Define the image dimensions (this should ideally come from your actual image data)
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;

//       console.log(
//         `Image dimensions - Width: ${imageWidth}, Height: ${imageHeight}`
//       );
//       console.log(
//         `Canvas dimensions - Width: ${canvasWidth}, Height: ${canvasHeight}`
//       );

//       // Scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       console.log(`Scaling factors - X: ${scaleX}, Y: ${scaleY}`);

//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           const { X, Y, W, H } = object.bbox;

//           // Apply scaling
//           const scaledX = X * scaleX;
//           const scaledY = Y * scaleY;
//           const scaledW = W * scaleX;
//           const scaledH = H * scaleY;

//           console.log(
//             `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//           );

//           // Draw the bounding box on the canvas
//           context.beginPath();
//           context.rect(scaledX, scaledY, scaledW, scaledH);
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//           context.closePath();
//         }
//       });
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

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
//       if (this.imageLoaded) {
//         this.drawLinesOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         this.drawObjectDataOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         console.log('Image loaded successfully');
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       } else {
//         image.onerror = () => {
//           console.error('Error loading image');
//         };
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear the canvas before drawing new content
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw coordinates if available
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       console.log(`Scaling factors - X: ${scaleX}, Y: ${scaleY}`);

//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           const { X, Y, W, H } = object.bbox;

//           // Apply scaling to bounding box coordinates
//           const scaledX = X * scaleX;
//           const scaledY = Y * scaleY;
//           const scaledW = W * scaleX;
//           const scaledH = H * scaleY;

//           console.log(
//             `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//           );

//           // Draw the bounding box on the canvas
//           context.beginPath();
//           context.rect(scaledX, scaledY, scaledW, scaledH);
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//           context.closePath();
//         }
//       });
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

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
//       if (this.imageLoaded) {
//         this.drawLinesOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         // this.drawObjectDataOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         console.log('Image loaded successfully');
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         // this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         // this.drawObjectDataOnCanvas();
//       } else {
//         image.onerror = () => {
//           console.error('Error loading image');
//         };
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     console.log('coordinates from the canvas', this.coordinates);

//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw lines if coordinates are available
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;
//       console.log(imageHeight);

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       console.log(scaleX, scaleY);

//       console.log(`Scaling factors - X: ${scaleX}, Y: ${scaleY}`);

//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           let { X, Y, W, H } = object.bbox;

//           // Convert bbox to canvas coordinates
//           let scaledX = X * scaleX;
//           let scaledY = Y * scaleY;
//           let scaledW = W * scaleX;
//           let scaledH = H * scaleY;

//           // Ensure bounding box is within image bounds
//           if (
//             scaledX < 0 ||
//             scaledY < 0 ||
//             scaledX + scaledW > canvasWidth ||
//             scaledY + scaledH > canvasHeight
//           ) {
//             console.log('Bounding box out of image bounds, adjusting...');

//             // Adjust bounding box to fit within canvas bounds
//             if (scaledX < 0) scaledX = 0;
//             if (scaledY < 0) scaledY = 0;
//             if (scaledX + scaledW > canvasWidth)
//               scaledW = canvasWidth - scaledX;
//             if (scaledY + scaledH > canvasHeight)
//               scaledH = canvasHeight - scaledY;
//           }

//           console.log(
//             `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//           );

//           // Draw the bounding box on the canvas
//           context.beginPath();
//           context.rect(scaledX, scaledY, scaledW, scaledH);
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//           context.closePath();
//         }
//       });
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;
//   private scaleX: number = 1;
//   private scaleY: number = 1;

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
//       if (this.imageLoaded) {
//         this.drawOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         this.drawOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         console.log('Image loaded successfully');
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.calculateScalingFactors(canvas, image);
//         this.drawOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.calculateScalingFactors(canvas, image);
//         this.drawOnCanvas();
//       } else {
//         image.onerror = () => {
//           console.error('Error loading image');
//         };
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   calculateScalingFactors(
//     canvas: HTMLCanvasElement,
//     image: HTMLImageElement
//   ): void {
//     const imageWidth = image.naturalWidth;
//     const imageHeight = image.naturalHeight;
//     const canvasWidth = canvas.width;
//     const canvasHeight = canvas.height;

//     this.scaleX = canvasWidth / imageWidth;
//     this.scaleY = canvasHeight / imageHeight;

//     console.log(`Scaling factors - X: ${this.scaleX}, Y: ${this.scaleY}`);
//   }

//   drawOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear canvas
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw image
//       context.drawImage(image, 0, 0, canvas.width, canvas.height);

//       // Draw lines and object data
//       this.drawLinesOnCanvas(context);
//       this.drawObjectDataOnCanvas(context);
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawLinesOnCanvas(context: CanvasRenderingContext2D): void {
//     if (this.coordinates.length > 0) {
//       context.beginPath();
//       const startX = this.coordinates[0].x * this.scaleX;
//       const startY = this.coordinates[0].y * this.scaleY;
//       context.moveTo(startX, startY);

//       this.coordinates.forEach((coord, index) => {
//         const scaledX = coord.x * this.scaleX;
//         const scaledY = coord.y * this.scaleY;
//         console.log(`Coordinate ${index}: X = ${scaledX}, Y = ${scaledY}`);

//         if (index > 0) {
//           context.lineTo(scaledX, scaledY);
//         }
//       });

//       context.lineTo(startX, startY); // Closing the shape
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.stroke();
//       context.closePath();
//     }
//   }

//   drawObjectDataOnCanvas(context: CanvasRenderingContext2D): void {
//     this.objectData.forEach((object) => {
//       if (object && object.bbox) {
//         let { X, Y, W, H } = object.bbox;

//         // Convert bbox to canvas coordinates
//         let scaledX = X * this.scaleX;
//         let scaledY = Y * this.scaleY;
//         let scaledW = W * this.scaleX;
//         let scaledH = H * this.scaleY;

//         // Ensure bounding box is within image bounds
//         if (
//           scaledX < 0 ||
//           scaledY < 0 ||
//           scaledX + scaledW > context.canvas.width ||
//           scaledY + scaledH > context.canvas.height
//         ) {
//           console.log('Bounding box out of image bounds, adjusting...');

//           // Adjust bounding box to fit within canvas bounds
//           if (scaledX < 0) scaledX = 0;
//           if (scaledY < 0) scaledY = 0;
//           if (scaledX + scaledW > context.canvas.width)
//             scaledW = context.canvas.width - scaledX;
//           if (scaledY + scaledH > context.canvas.height)
//             scaledH = context.canvas.height - scaledY;
//         }

//         console
//           .log
//           // `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//           ();

//         // Draw the bounding box on the canvas
//         context.beginPath();
//         // context.rect(scaledX, scaledY, scaledW, scaledH);
//         context.strokeStyle = 'blue';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     });
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       console.log('ngAfterViewInit called');
//       this.setupCanvas();
//     }
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && !changes['coordinates'].firstChange) {
//       console.log(
//         'Coordinates received in ImageViewerComponent:',
//         this.coordinates
//       );
//       if (this.imageLoaded) {
//         this.drawLinesOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         this.drawObjectDataOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       const image = this.imageElement.nativeElement;
//       const canvas = this.imageCanvas.nativeElement;
//       const context = canvas.getContext('2d');

//       if (image && canvas && context) {
//         image.onload = () => {
//           this.initializeCanvas(canvas, image);
//           this.imageLoaded = true;
//           this.drawLinesOnCanvas();
//           this.drawObjectDataOnCanvas();
//         };

//         if (image.complete) {
//           image.onload = null;
//           this.initializeCanvas(canvas, image);
//           this.imageLoaded = true;
//           this.drawLinesOnCanvas();
//           this.drawObjectDataOnCanvas();
//         } else {
//           image.onerror = () => {
//             console.error('Error loading image');
//           };
//         }
//       } else {
//         console.error('Image or Canvas element not found.');
//       }
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     console.log('Coordinates from the canvas:', this.coordinates);

//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw the lines
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         const scaleX = canvas.width / image.naturalWidth;
//         const scaleY = canvas.height / image.naturalHeight;

//         this.coordinates.forEach((coord, index) => {
//           const scaledX = coord.x * scaleX;
//           const scaledY = coord.y * scaleY;

//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw lines if coordinates are available
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         const scaleX = canvas.width / image.naturalWidth;
//         const scaleY = canvas.height / image.naturalHeight;

//         this.coordinates.forEach((coord, index) => {
//           const scaledX = coord.x * scaleX;
//           const scaledY = coord.y * scaleY;

//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }

//       // Draw bounding boxes
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           let { X, Y, W, H } = object.bbox;

//           // Convert bbox to canvas coordinates
//           let scaledX = X * scaleX;
//           let scaledY = Y * scaleY;
//           let scaledW = W * scaleX;
//           let scaledH = H * scaleY;

//           // Ensure bounding box is within canvas bounds
//           if (
//             scaledX < 0 ||
//             scaledY < 0 ||
//             scaledX + scaledW > canvasWidth ||
//             scaledY + scaledH > canvasHeight
//           ) {
//             console.log('Bounding box out of image bounds, adjusting...');

//             if (scaledX < 0) scaledX = 0;
//             if (scaledY < 0) scaledY = 0;
//             if (scaledX + scaledW > canvasWidth)
//               scaledW = canvasWidth - scaledX;
//             if (scaledY + scaledH > canvasHeight)
//               scaledH = canvasHeight - scaledY;
//           }

//           console.log(
//             `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//           );

//           context.beginPath();
//           context.rect(scaledX, scaledY, scaledW, scaledH);
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//           context.closePath();
//         }
//       });
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && !changes['coordinates'].firstChange) {
//       console.log('Coordinates received:', this.coordinates);
//       if (this.imageLoaded) {
//         this.drawLinesOnCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log('Object Data received:', this.objectData);
//       if (this.imageLoaded) {
//         this.drawObjectDataOnCanvas();
//       }
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (image && canvas && context) {
//       image.onload = () => {
//         console.log('Image loaded successfully');
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawObjectDataOnCanvas();
//       } else {
//         image.onerror = () => {
//           console.error('Error loading image');
//         };
//       }
//     } else {
//       console.error('Image or Canvas element not found.');
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     console.log('coordinates from the canvas', this.coordinates);

//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Iterate over each object in objectData to draw non-rectangular bounding boxes
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           // Begin drawing the polygon
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }

//               console.log(`Scaled Point - X: ${scaledX}, Y: ${scaledY}`);
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });

//       // Draw lines if coordinates are available (for any additional lines)
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach(
//           (coord: { x: number; y: number }, index: number) => {
//             if (index > 0) {
//               context.lineTo(coord.x, coord.y);
//             }
//           }
//         );

//         context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && this.imageLoaded) {
//       console.log('Coordinates received:', this.coordinates);
//       this.drawLinesOnCanvas();
//     }

//     if (changes['objectData'] && this.imageLoaded) {
//       console.log('Object Data received:', this.objectData);
//       this.drawObjectDataOnCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       // context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//         this.coordinates.forEach((coord, index) => {
//           if (index > 0) {
//             context.lineTo(coord.x, coord.y);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Iterate over each object in objectData to draw non-rectangular bounding boxes
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           // Begin drawing the polygon
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && this.imageLoaded) {
//       console.log('Coordinates received:', this.coordinates);
//       this.drawLinesOnCanvas();
//     }

//     if (changes['objectData'] && this.imageLoaded) {
//       console.log('Object Data received:', this.objectData);
//       this.drawObjectDataOnCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         // Scale and draw the coordinates
//         this.coordinates.forEach((coord, index) => {
//           const scaledX = coord.x * scaleX;
//           const scaledY = coord.y * scaleY;

//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Iterate over each object in objectData to draw non-rectangular bounding boxes
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           // Begin drawing the polygon
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });

//       // Draw lines if coordinates are available (for any additional lines)
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         this.coordinates.forEach((coord, index) => {
//           const scaledX = coord.x * scaleX;
//           const scaledY = coord.y * scaleY;

//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && this.imageLoaded) {
//       console.log('Coordinates received:', this.coordinates);
//       this.drawLinesOnCanvas();
//     }

//     if (changes['objectData'] && this.imageLoaded) {
//       console.log('Object Data received:', this.objectData);
//       this.drawObjectDataOnCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     // Set canvas size to match the image's natural dimensions
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;

//     // Ensure the canvas element scales with the image dimensions in the UI
//     canvas.style.width = `${image.naturalWidth}px`;
//     canvas.style.height = `${image.naturalHeight}px`;
//   }

//   drawLinesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear previous drawings
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       console.log('Scaling factors:', { scaleX, scaleY });

//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         // Scale and draw the coordinates
//         this.coordinates.forEach((coord, index) => {
//           const scaledX = coord.x * scaleX;
//           const scaledY = coord.y * scaleY;

//           console.log('Drawing line to:', { scaledX, scaledY });

//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawObjectDataOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear previous drawings
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       console.log('Scaling factors:', { scaleX, scaleY });

//       // Iterate over each object in objectData to draw non-rectangular bounding boxes
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           // Begin drawing the polygon
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               console.log('Drawing polygon point:', { scaledX, scaledY });

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });

//       // Draw lines if coordinates are available (for any additional lines)
//       if (this.coordinates.length > 0) {
//         context.beginPath();
//         this.coordinates.forEach((coord, index) => {
//           const scaledX = coord.x * scaleX;
//           const scaledY = coord.y * scaleY;

//           console.log('Drawing line to:', { scaledX, scaledY });

//           if (index === 0) {
//             context.moveTo(scaledX, scaledY);
//           } else {
//             context.lineTo(scaledX, scaledY);
//           }
//         });

//         context.closePath();
//         context.strokeStyle = 'red';
//         context.lineWidth = 2;
//         context.stroke();
//       }
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   // Method to expand the canvas size if needed
//   expandCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     // Check if image dimensions are different from canvas dimensions
//     if (
//       image.naturalWidth !== canvas.width ||
//       image.naturalHeight !== canvas.height
//     ) {
//       // Set canvas size to match the image's natural dimensions
//       canvas.width = image.naturalWidth;
//       canvas.height = image.naturalHeight;

//       // Ensure the canvas element scales with the image dimensions in the UI
//       canvas.style.width = `${image.naturalWidth}px`;
//       canvas.style.height = `${image.naturalHeight}px`;

//       // Redraw content to fit the new canvas size
//       this.drawLinesOnCanvas();
//       this.drawObjectDataOnCanvas();
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['coordinates'] && this.imageLoaded) {
//       console.log('Coordinates received:', this.coordinates);
//       this.redrawCanvas();
//     }

//     if (changes['objectData'] && this.imageLoaded) {
//       console.log('Object Data received:', this.objectData);
//       this.redrawCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     // Set canvas size to match the image's natural dimensions
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;

//     // Ensure the canvas element scales with the image dimensions in the UI
//     canvas.style.width = `${image.naturalWidth}px`;
//     canvas.style.height = `${image.naturalHeight}px`;
//   }

//   redrawCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear previous drawings
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       console.log('Scaling factors:', { scaleX, scaleY });

//       // Draw lines and object data
//       this.drawLinesOnCanvas(context, scaleX, scaleY);
//       this.drawObjectDataOnCanvas(context, scaleX, scaleY);
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawLinesOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.coordinates.length > 0) {
//       context.beginPath();
//       this.coordinates.forEach((coord, index) => {
//         const scaledX = coord.x * scaleX;
//         const scaledY = coord.y * scaleY;

//         if (index === 0) {
//           context.moveTo(scaledX, scaledY);
//         } else {
//           context.lineTo(scaledX, scaledY);
//         }
//       });

//       context.closePath();
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.stroke();
//     }
//   }

//   drawObjectDataOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.objectData.length > 0) {
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)
//   @Input() zoomLevel: number = 1; // Zoom level to scale the canvas (e.g., 1 for no zoom, 2 for 2x zoom)

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (
//       (changes['coordinates'] ||
//         changes['objectData'] ||
//         changes['zoomLevel']) &&
//       this.imageLoaded
//     ) {
//       console.log('Updating canvas with new data.');
//       this.redrawCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     // Set canvas size to match the image's natural dimensions
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;

//     // Ensure the canvas element scales with the image dimensions in the UI
//     canvas.style.width = `${image.naturalWidth}px`;
//     canvas.style.height = `${image.naturalHeight}px`;
//   }

//   redrawCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear previous drawings
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Apply zoom level to the canvas
//       context.save(); // Save the current state
//       context.scale(this.zoomLevel, this.zoomLevel);

//       // Draw the image
//       context.drawImage(image, 0, 0, imageWidth, imageHeight);

//       // Draw lines and object data
//       this.drawLinesOnCanvas(context, scaleX, scaleY);
//       this.drawObjectDataOnCanvas(context, scaleX, scaleY);

//       // Restore the context to its original state
//       context.restore();
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawLinesOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.coordinates.length > 0) {
//       context.beginPath();
//       this.coordinates.forEach((coord, index) => {
//         const scaledX = coord.x * scaleX;
//         const scaledY = coord.y * scaleY;

//         console.log('Drawing line to:', { scaledX, scaledY });

//         if (index === 0) {
//           context.moveTo(scaledX, scaledY);
//         } else {
//           context.lineTo(scaledX, scaledY);
//         }
//       });

//       context.closePath();
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.stroke();
//     }
//   }

//   drawObjectDataOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.objectData.length > 0) {
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               console.log('Drawing polygon point:', { scaledX, scaledY });

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)
//   @Input() zoomLevel: number = 1; // Zoom level to scale the canvas (e.g., 1 for no zoom, 2 for 2x zoom)
//   @Input() expandToFit: boolean = false; // Whether to expand drawings to fit the canvas

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (
//       (changes['coordinates'] ||
//         changes['objectData'] ||
//         changes['zoomLevel'] ||
//         changes['expandToFit']) &&
//       this.imageLoaded
//     ) {
//       console.log('Updating canvas with new data.');
//       this.redrawCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     // Set canvas size to match the image's natural dimensions
//     canvas.width = image.naturalWidth;
//     canvas.height = image.naturalHeight;

//     // Ensure the canvas element scales with the image dimensions in the UI
//     canvas.style.width = `${image.naturalWidth}px`;
//     canvas.style.height = `${image.naturalHeight}px`;
//   }

//   redrawCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear previous drawings
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Apply zoom level to the canvas
//       context.save(); // Save the current state
//       context.scale(this.zoomLevel, this.zoomLevel);

//       // Draw the image
//       context.drawImage(image, 0, 0, imageWidth, imageHeight);

//       // Apply scaling to the context for drawings
//       if (this.expandToFit) {
//         // Adjust context scaling to fit the canvas
//         context.scale(scaleX, scaleY);
//       }

//       // Draw lines and object data
//       this.drawLinesOnCanvas(context, scaleX, scaleY);
//       this.drawObjectDataOnCanvas(context, scaleX, scaleY);

//       // Restore the context to its original state
//       context.restore();
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawLinesOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.coordinates.length > 0) {
//       context.beginPath();
//       this.coordinates.forEach((coord, index) => {
//         const scaledX = coord.x * scaleX;
//         const scaledY = coord.y * scaleY;

//         console.log('Drawing line to:', { scaledX, scaledY });

//         if (index === 0) {
//           context.moveTo(scaledX, scaledY);
//         } else {
//           context.lineTo(scaledX, scaledY);
//         }
//       });

//       context.closePath();
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.stroke();
//     }
//   }

//   drawObjectDataOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.objectData.length > 0) {
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               const scaledX = point.X * scaleX;
//               const scaledY = point.Y * scaleY;

//               console.log('Drawing polygon point:', { scaledX, scaledY });

//               if (index === 0) {
//                 context.moveTo(scaledX, scaledY);
//               } else {
//                 context.lineTo(scaledX, scaledY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
//   @Input() imageSrc: string = '';
//   @Input() coordinates: { x: number; y: number }[] = []; // For lines
//   @Input() objectData: any[] = []; // For bounding boxes (now polygons)
//   @Input() zoomLevel: number = 1; // Zoom level to scale the canvas (e.g., 1 for no zoom, 2 for 2x zoom)
//   @Input() expandToFit: boolean = false; // Whether to expand drawings to fit the canvas

//   @ViewChild('imageElement', { static: true })
//   imageElement!: ElementRef<HTMLImageElement>;
//   @ViewChild('imageCanvas', { static: true })
//   imageCanvas!: ElementRef<HTMLCanvasElement>;

//   private imageLoaded: boolean = false;

//   ngOnInit(): void {
//     console.log('ngOnInit called');
//   }

//   ngAfterViewInit(): void {
//     console.log('ngAfterViewInit called');
//     this.setupCanvas();
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (
//       (changes['coordinates'] ||
//         changes['objectData'] ||
//         changes['zoomLevel'] ||
//         changes['expandToFit']) &&
//       this.imageLoaded
//     ) {
//       console.log('Updating canvas with new data.');
//       this.redrawCanvas();
//     }
//   }

//   setupCanvas(): void {
//     const image = this.imageElement.nativeElement;
//     const canvas = this.imageCanvas.nativeElement;

//     image.onload = () => {
//       console.log('Image loaded successfully');
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     };

//     if (image.complete && !this.imageLoaded) {
//       // If the image is already loaded (cached)
//       this.initializeCanvas(canvas, image);
//       this.imageLoaded = true;
//       this.redrawCanvas();
//     } else {
//       image.onerror = () => {
//         console.error('Error loading image');
//       };
//     }
//   }

//   initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
//     // Set canvas size to match the image's natural dimensions
//     canvas.width = image.naturalWidth * this.zoomLevel;
//     canvas.height = image.naturalHeight * this.zoomLevel;

//     // Ensure the canvas element scales with the image dimensions in the UI
//     canvas.style.width = `${canvas.width}px`;
//     canvas.style.height = `${canvas.height}px`;
//   }

//   redrawCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');
//     const image = this.imageElement.nativeElement;

//     if (context && image) {
//       // Clear previous drawings
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Get dimensions of image and canvas
//       const imageWidth = image.naturalWidth;
//       const imageHeight = image.naturalHeight;
//       const canvasWidth = canvas.width;
//       const canvasHeight = canvas.height;

//       // Apply zoom level to the canvas
//       context.save(); // Save the current state
//       context.scale(this.zoomLevel, this.zoomLevel);

//       // Draw the image
//       context.drawImage(image, 0, 0, imageWidth, imageHeight);

//       // Calculate scaling factors
//       const scaleX = canvasWidth / imageWidth;
//       const scaleY = canvasHeight / imageHeight;

//       // Apply scaling to the context if expandToFit is true
//       if (this.expandToFit) {
//         context.scale(scaleX, scaleY);
//       }

//       // Draw lines and object data with expanded coordinates
//       this.drawLinesOnCanvas(context, scaleX, scaleY);
//       this.drawObjectDataOnCanvas(context, scaleX, scaleY);

//       // Restore the context to its original state
//       context.restore();
//     } else {
//       console.error('Canvas context or image is not available.');
//     }
//   }

//   drawLinesOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.coordinates.length > 0) {
//       context.beginPath();
//       this.coordinates.forEach((coord, index) => {
//         // Expand coordinates
//         const expandedX = coord.x * this.zoomLevel;
//         const expandedY = coord.y * this.zoomLevel;

//         console.log('Drawing line to:', { expandedX, expandedY });

//         if (index === 0) {
//           context.moveTo(expandedX, expandedY);
//         } else {
//           context.lineTo(expandedX, expandedY);
//         }
//       });

//       context.closePath();
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.stroke();
//     }
//   }

//   drawObjectDataOnCanvas(
//     context: CanvasRenderingContext2D,
//     scaleX: number,
//     scaleY: number
//   ): void {
//     if (context && this.objectData.length > 0) {
//       this.objectData.forEach((object: any) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           context.beginPath();

//           object.bbox.forEach(
//             (point: { X: number; Y: number }, index: number) => {
//               // Expand coordinates
//               const expandedX = point.X * this.zoomLevel;
//               const expandedY = point.Y * this.zoomLevel;

//               console.log('Drawing polygon point:', { expandedX, expandedY });

//               if (index === 0) {
//                 context.moveTo(expandedX, expandedY);
//               } else {
//                 context.lineTo(expandedX, expandedY);
//               }
//             }
//           );

//           context.closePath();
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
//         }
//       });
//     }
//   }
// }
export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() imageSrc: string = '';
  @Input() coordinates: { x: number; y: number }[] = []; // For lines
  @Input() objectData: any[] = []; // For bounding boxes (now polygons)
  @Input() zoomLevel: number = 1; // Zoom level to scale the canvas (e.g., 1 for no zoom, 2 for 2x zoom)
  @Input() expandToFit: boolean = false; // Whether to expand drawings to fit the canvas

  @ViewChild('imageElement', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;
  @ViewChild('imageCanvas', { static: true })
  imageCanvas!: ElementRef<HTMLCanvasElement>;

  private imageLoaded: boolean = false;

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.setupCanvas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['coordinates'] ||
        changes['objectData'] ||
        changes['zoomLevel'] ||
        changes['expandToFit']) &&
      this.imageLoaded
    ) {
      console.log('Updating canvas with new data.');
      this.redrawCanvas();
    }
  }

  setupCanvas(): void {
    const image = this.imageElement.nativeElement;
    const canvas = this.imageCanvas.nativeElement;

    image.onload = () => {
      console.log('Image loaded successfully');
      this.initializeCanvas(canvas, image);
      this.imageLoaded = true;
      this.redrawCanvas();
    };

    if (image.complete && !this.imageLoaded) {
      // If the image is already loaded (cached)
      this.initializeCanvas(canvas, image);
      this.imageLoaded = true;
      this.redrawCanvas();
    } else {
      image.onerror = () => {
        console.error('Error loading image');
      };
    }
  }

  initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
    // Set canvas size to match the image's natural dimensions
    canvas.width = image.naturalWidth * this.zoomLevel;
    canvas.height = image.naturalHeight * this.zoomLevel;

    // Ensure the canvas element scales with the image dimensions in the UI
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
  }

  redrawCanvas(): void {
    const canvas = this.imageCanvas.nativeElement;
    const context = canvas.getContext('2d');
    const image = this.imageElement.nativeElement;

    if (context && image) {
      // Clear previous drawings
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Get dimensions of image and canvas
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Apply zoom level to the canvas
      context.save(); // Save the current state
      context.scale(this.zoomLevel, this.zoomLevel);

      // Draw the image
      context.drawImage(image, 0, 0, imageWidth, imageHeight);

      // Calculate scaling factors
      const scaleX = canvasWidth / imageWidth;
      const scaleY = canvasHeight / imageHeight;

      // Apply scaling to the context if expandToFit is true
      if (this.expandToFit) {
        context.scale(scaleX, scaleY);
      }

      // Draw lines and object data with expanded coordinates
      this.drawLinesOnCanvas(context, scaleX, scaleY);
      this.drawObjectDataOnCanvas(context, scaleX, scaleY);

      // Restore the context to its original state
      context.restore();
    } else {
      console.error('Canvas context or image is not available.');
    }
  }

  drawLinesOnCanvas(
    context: CanvasRenderingContext2D,
    scaleX: number,
    scaleY: number
  ): void {
    if (context && this.coordinates.length > 0) {
      context.beginPath();
      this.coordinates.forEach((coord, index) => {
        // Expand coordinates by multiplying by 2
        const expandedX = coord.x * 2;
        const expandedY = coord.y * 2;

        console.log('Drawing line to:', { expandedX, expandedY });

        if (index === 0) {
          context.moveTo(expandedX, expandedY);
        } else {
          context.lineTo(expandedX, expandedY);
        }
      });

      context.closePath();
      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      context.stroke();
    }
  }

  drawObjectDataOnCanvas(
    context: CanvasRenderingContext2D,
    scaleX: number,
    scaleY: number
  ): void {
    if (context && this.objectData.length > 0) {
      this.objectData.forEach((object: any) => {
        if (object && object.bbox && Array.isArray(object.bbox)) {
          context.beginPath();

          object.bbox.forEach(
            (point: { X: number; Y: number }, index: number) => {
              // Expand coordinates by multiplying by 2
              const expandedX = point.X * 2;
              const expandedY = point.Y * 2;

              console.log('Drawing polygon point:', { expandedX, expandedY });

              if (index === 0) {
                context.moveTo(expandedX, expandedY);
              } else {
                context.lineTo(expandedX, expandedY);
              }
            }
          );

          context.closePath();
          context.strokeStyle = 'blue';
          context.lineWidth = 2;
          context.stroke();
        }
      });
    }
  }
}
