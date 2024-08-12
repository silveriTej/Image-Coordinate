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
//         this.drawBoundingBoxesOnCanvas();
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
//         this.drawBoundingBoxesOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawBoundingBoxesOnCanvas();
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

//   // drawSingleBoundingBox(): void {
//   //   const canvas = this.imageCanvas.nativeElement;
//   //   const context = canvas.getContext('2d');
//   //   const image = this.imageElement.nativeElement;

//   //   if (context && image) {
//   //     // Clear the canvas before drawing new content
//   //     context.clearRect(0, 0, canvas.width, canvas.height);

//   //     // Draw coordinates if available
//   //     if (this.coordinates.length > 0) {
//   //       context.beginPath();
//   //       context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//   //       this.coordinates.forEach((coord, index) => {
//   //         if (index > 0) {
//   //           context.lineTo(coord.x, coord.y);
//   //         }
//   //       });

//   //       context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//   //       context.strokeStyle = 'red';
//   //       context.lineWidth = 2;
//   //       context.stroke();
//   //       context.closePath();
//   //     }

//   //     // Get dimensions of image and canvas
//   //     const imageWidth = image.naturalWidth;
//   //     const imageHeight = image.naturalHeight;
//   //     const canvasWidth = canvas.width;
//   //     const canvasHeight = canvas.height;

//   //     // Calculate scaling factors
//   //     const scaleX = canvasWidth / imageWidth;
//   //     const scaleY = canvasHeight / imageHeight;

//   //     console.log(`Scaling factors - X: ${scaleX}, Y: ${scaleY}`);

//   //     // Draw the first bounding box if available
//   //     if (this.objectData.length > 0) {
//   //       const object = this.objectData[0]; // Get the first object
//   //       if (object && object.bbox) {
//   //         const { X, Y, W, H } = object.bbox;

//   //         // Apply scaling to bounding box coordinates
//   //         const scaledX = X * scaleX;
//   //         const scaledY = Y * scaleY;
//   //         const scaledW = W * scaleX;
//   //         const scaledH = H * scaleY;

//   //         console.log(
//   //           `Drawing bbox - X: ${scaledX}, Y: ${scaledY}, W: ${scaledW}, H: ${scaledH}`
//   //         );

//   //         // Draw the bounding box on the canvas
//   //         context.beginPath();
//   //         context.rect(scaledX, scaledY, scaledW, scaledH);
//   //         context.strokeStyle = 'blue';
//   //         context.lineWidth = 2;
//   //         context.stroke();
//   //         context.closePath();
//   //       }
//   //     }
//   //   } else {
//   //     console.error('Canvas context or image is not available.');
//   //   }
//   // }
//   drawBoundingBoxesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       // Draw the image again
//       // this.initializeCanvas(canvas);

//       // Draw bounding boxes based on object data
//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           const { X, Y, W, H } = object.bbox;

//           console.log(`Drawing bbox - X: ${X}, Y: ${Y}, W: ${W}, H: ${H}`);

//           // Draw the bounding box as a series of lines
//           context.beginPath();
//           context.moveTo(X, Y);
//           context.lineTo(X + W, Y);
//           context.lineTo(X + W, Y + H);
//           context.lineTo(X, Y + H);
//           context.closePath(); // Closing the shape
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
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
//         this.drawBoundingShapesOnCanvas();
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
//         this.drawBoundingShapesOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawBoundingShapesOnCanvas();
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

//   drawBoundingShapesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       // Clear the canvas before drawing new content
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw bounding shapes based on object data
//       this.objectData.forEach((object) => {
//         if (object && object.bbox && Array.isArray(object.bbox)) {
//           const points = object.bbox;

//           // Begin a new path for each shape
//           context.beginPath();

//           // Move to the first point
//           context.moveTo(points[0].X, points[0].Y);

//           // Draw lines to each subsequent point
//           points.forEach((point: { X: number; Y: number }) => {
//             context.lineTo(point.X, point.Y);
//           });

//           // Close the path
//           context.closePath();

//           // Set stroke style and draw the shape
//           context.strokeStyle = 'blue';
//           context.lineWidth = 2;
//           context.stroke();
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
//   @Input() objectData: any[] = []; // For bounding shapes

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
//         this.drawBoundingShapesOnCanvas();
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
//         this.drawBoundingShapesOnCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawLinesOnCanvas();
//         this.drawBoundingShapesOnCanvas();
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

//   drawBoundingShapesOnCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       this.objectData.forEach((object) => {
//         if (object && object.bbox) {
//           const { X, Y, W, H } = object.bbox;

//           // Draw the bounding box as a rectangle or any custom shape
//           context.beginPath();
//           context.rect(X, Y, W, H); // Drawing a rectangle for simplicity
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
//   @Input() objectData: any[] = []; // For bounding shapes

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
//         this.drawCanvas();
//       }
//     }

//     if (changes['objectData'] && !changes['objectData'].firstChange) {
//       console.log(
//         'Object Data received in ImageViewerComponent:',
//         this.objectData
//       );
//       if (this.imageLoaded) {
//         this.drawCanvas();
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
//         this.drawCanvas();
//       };

//       if (image.complete) {
//         image.onload = null;
//         this.initializeCanvas(canvas, image);
//         this.imageLoaded = true;
//         this.drawCanvas();
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

//   drawCanvas(): void {
//     const canvas = this.imageCanvas.nativeElement;
//     const context = canvas.getContext('2d');

//     if (context) {
//       context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

//       // Draw lines based on coordinates
//       this.drawLinesOnCanvas(context);

//       // Draw bounding shapes based on objectData
//       this.drawBoundingShapesOnCanvas(context);
//     } else {
//       console.error('Canvas context is not available.');
//     }
//   }

//   drawLinesOnCanvas(context: CanvasRenderingContext2D): void {
//     if (this.coordinates.length > 0) {
//       context.beginPath();
//       context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

//       this.coordinates.forEach((coord, index) => {
//         if (index > 0) {
//           context.lineTo(coord.x, coord.y);
//         }
//       });

//       context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
//       context.strokeStyle = 'red';
//       context.lineWidth = 2;
//       context.stroke();
//       context.closePath();
//     }
//   }

//   // drawBoundingShapesOnCanvas(context: CanvasRenderingContext2D): void {
//   //   this.objectData.forEach((object) => {
//   //     if (object && object.bbox) {
//   //       const { X, Y, W, H } = object.bbox;

//   //       // Draw the bounding box as a rectangle or any custom shape
//   //       context.beginPath();
//   //       context.rect(X, Y, W, H); // Drawing a rectangle for simplicity
//   //       context.strokeStyle = 'blue';
//   //       context.lineWidth = 2;
//   //       context.stroke();
//   //       context.closePath();
//   //     }
//   //   });
//   // }
//   drawBoundingShapesOnCanvas(context: CanvasRenderingContext2D): void {
//     this.objectData.forEach((object) => {
//       if (object && object.bbox) {
//         const { H, W, X, Y } = object.bbox;

//         // Assuming bbox represents a complex shape, not just a rectangle
//         // Begin drawing the shape
//         context.beginPath();

//         // Draw a polygonal shape based on the points
//         context.moveTo(X, Y); // Starting point

//         // Example of creating a shape with points relative to (X, Y)
//         context.lineTo(X + W, Y); // Top-right corner
//         context.lineTo(X + W, Y + H); // Bottom-right corner
//         context.lineTo(X, Y + H); // Bottom-left corner
//         context.lineTo(X, Y); // Back to starting point

//         // If the shape is more complex, you'd have more lineTo calls here
//         // context.lineTo(...);
//         // ...

//         // Set stroke style and draw the shape
//         context.strokeStyle = 'blue';
//         context.lineWidth = 2;
//         context.stroke();
//         context.closePath();
//       }
//     });
//   }
// }
export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() imageSrc: string = '';
  @Input() coordinates: { x: number; y: number }[] = []; // For lines
  @Input() objectData: any[] = []; // For bounding boxes

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
    this.initializeCanvasAndCheckBounds();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinates'] && !changes['coordinates'].firstChange) {
      console.log(
        'Coordinates received in ImageViewerComponent:',
        this.coordinates
      );
      if (this.imageLoaded) {
        this.drawLinesOnCanvas();
      }
    }

    if (changes['objectData'] && !changes['objectData'].firstChange) {
      console.log(
        'Object Data received in ImageViewerComponent:',
        this.objectData
      );
      if (this.imageLoaded) {
        this.drawBoundingShapesOnCanvas();
      }
    }
  }

  initializeCanvasAndCheckBounds(): void {
    const image = this.imageElement.nativeElement;
    const canvas = this.imageCanvas.nativeElement;

    // Get image dimensions
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    // Validate bbox and roi_bbox coordinates against image dimensions
    let maxX = 0,
      maxY = 0;

    this.objectData.forEach((object) => {
      if (object && object.bbox) {
        const { X, Y, W, H } = object.bbox;
        // Check if any bbox goes out of image boundaries
        maxX = Math.max(maxX, X + W);
        maxY = Math.max(maxY, Y + H);
      }

      if (object && object.roi_bbox) {
        const roiPoints = object.roi_bbox; // Assuming this is an array of points
        roiPoints.forEach((point: { X: number; Y: number }) => {
          maxX = Math.max(maxX, point.X);
          maxY = Math.max(maxY, point.Y);
        });
      }
    });

    // Check if we need to resize the image and canvas
    let scaleFactor = 1;
    if (maxX > imageWidth || maxY > imageHeight) {
      const scaleX = maxX / imageWidth;
      const scaleY = maxY / imageHeight;
      scaleFactor = Math.max(scaleX, scaleY); // Scale up to fit the bounding boxes
    } else if (maxX < imageWidth && maxY < imageHeight) {
      // Optional: scale down if the bounding boxes are much smaller than the image
      const scaleX = imageWidth / maxX;
      const scaleY = imageHeight / maxY;
      scaleFactor = Math.min(scaleX, scaleY);
    }

    // Apply the scale factor
    const newWidth = imageWidth * scaleFactor;
    const newHeight = imageHeight * scaleFactor;

    // Resize the canvas
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw image on canvas with new dimensions
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(image, 0, 0, newWidth, newHeight);
    }

    this.imageLoaded = true;
    this.drawLinesOnCanvas();
    this.drawBoundingShapesOnCanvas();
  }

  drawLinesOnCanvas(): void {
    const canvas = this.imageCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (this.coordinates.length > 0) {
        context.beginPath();
        context.moveTo(this.coordinates[0].x, this.coordinates[0].y);

        this.coordinates.forEach((coord, index) => {
          if (index > 0) {
            context.lineTo(coord.x, coord.y);
          }
        });

        context.lineTo(this.coordinates[0].x, this.coordinates[0].y); // Closing the shape
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
      }
    } else {
      console.error('Canvas context is not available.');
    }
  }

  drawBoundingShapesOnCanvas(): void {
    const canvas = this.imageCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      // Draw the image again if necessary
      this.initializeCanvasAndCheckBounds();

      // Draw bounding shapes based on object data
      this.objectData.forEach((object) => {
        if (object && object.bbox) {
          const { X, Y, W, H } = object.bbox;

          console.log(`Drawing bbox - X: ${X}, Y: ${Y}, W: ${W}, H: ${H}`);

          // Draw the bounding box as a series of lines
          context.beginPath();
          context.moveTo(X, Y);
          context.lineTo(X + W, Y);
          context.lineTo(X + W, Y + H);
          context.lineTo(X, Y + H);
          context.closePath(); // Closing the shape
          context.strokeStyle = 'blue';
          context.lineWidth = 2;
          context.stroke();
        }
      });
    } else {
      console.error('Canvas context is not available.');
    }
  }
}
// export class ImageViewerComponent implements OnInit, AfterViewInit {
//   @Input() imageSrc: string = '';
//   @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

//   private canvas!: HTMLCanvasElement;
//   private context!: CanvasRenderingContext2D;
//   private image!: HTMLImageElement;
//   private linesDrawn: boolean = false;
//   private bboxData: any[] = []; // Replace with actual data

//   constructor() {}

//   ngOnInit(): void {
//     // Initialize any necessary data here
//     this.bboxData = [
//       // Example bbox data
//       { X: 706, Y: 440, W: 754, H: 584, class_name: 'person' },
//       { X: 200, Y: 30, W: 80, H: 120, class_name: 'car' },
//     ];
//   }

//   ngAfterViewInit(): void {
//     this.initializeCanvasAndCheckBounds();
//   }

//   private initializeCanvasAndCheckBounds(): void {
//     this.canvas = this.canvasRef.nativeElement;
//     this.context = this.canvas.getContext('2d')!;
//     this.image = this.imageRef.nativeElement;

//     if (this.context && this.image) {
//       this.checkImageAndResize();
//     }
//   }

//   private checkImageAndResize(): void {
//     const imageWidth = this.image.width;
//     const imageHeight = this.image.height;

//     // Ensure the canvas matches the image size
//     this.canvas.width = imageWidth;
//     this.canvas.height = imageHeight;

//     // Check if bbox data is within the image bounds
//     const isDataWithinBounds = this.bboxData.every(
//       (bbox) =>
//         bbox.X >= 0 &&
//         bbox.Y >= 0 &&
//         bbox.X + bbox.W <= imageWidth &&
//         bbox.Y + bbox.H <= imageHeight
//     );

//     if (isDataWithinBounds) {
//       this.drawBoundingShapesOnCanvas();
//     } else {
//       console.warn('Bounding box data is out of image bounds.');
//       // Optionally, adjust the image size or handle out-of-bounds data
//       this.resizeCanvasToFitImage();
//     }
//   }

//   private resizeCanvasToFitImage(): void {
//     const imageWidth = this.image.width;
//     const imageHeight = this.image.height;
//     const canvasWidth = this.canvas.width;
//     const canvasHeight = this.canvas.height;

//     // Calculate scaling factors
//     const scaleX = canvasWidth / imageWidth;
//     const scaleY = canvasHeight / imageHeight;

//     // Set canvas size and scale context
//     this.canvas.width = imageWidth;
//     this.canvas.height = imageHeight;
//     this.context.scale(scaleX, scaleY);

//     // Draw the image and bounding shapes
//     this.context.drawImage(this.image, 0, 0);
//     this.drawBoundingShapesOnCanvas();
//   }

//   private drawBoundingShapesOnCanvas(): void {
//     if (this.linesDrawn) return; // Prevent re-drawing

//     if (this.context) {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       this.context.drawImage(this.image, 0, 0);

//       this.bboxData.forEach((bbox) => {
//         this.drawObjectBoundingBox(bbox);
//       });

//       this.linesDrawn = true;
//     }
//   }

//   private drawObjectBoundingBox(bbox: any): void {
//     if (this.context) {
//       const { X, Y, W, H, class_name } = bbox;

//       // Draw the bounding box
//       this.context.strokeStyle = 'red';
//       this.context.lineWidth = 2;
//       this.context.strokeRect(X, Y, W, H);

//       // Optionally, draw additional information
//       this.context.fillStyle = 'red';
//       this.context.font = '12px Arial';
//       this.context.fillText(class_name, X, Y - 5);
//     }
//   }
// }
// export class ImageViewerComponent implements OnInit, AfterViewInit {
//   @Input() imageSrc: string = '';
//   @Input() objectData: any[] = []; // Replace with actual data if provided as input

//   @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

//   private canvas!: HTMLCanvasElement;
//   private context!: CanvasRenderingContext2D;
//   private image!: HTMLImageElement;
//   private linesDrawn: boolean = false;

//   constructor() {}

//   ngOnInit(): void {
//     // Initialize or fetch bbox data here if not using @Input
//     // this.objectData = [...]; // Example bbox data
//   }

//   ngAfterViewInit(): void {
//     this.initializeCanvasAndCheckBounds();
//   }

//   private initializeCanvasAndCheckBounds(): void {
//     this.canvas = this.canvasRef.nativeElement;
//     this.context = this.canvas.getContext('2d')!;
//     this.image = this.imageRef.nativeElement;

//     if (this.context && this.image) {
//       this.image.onload = () => {
//         this.checkImageAndResize();
//       };
//     }
//   }

//   private checkImageAndResize(): void {
//     const imageWidth = this.image.width;
//     const imageHeight = this.image.height;

//     // Ensure the canvas matches the image size
//     this.canvas.width = imageWidth;
//     this.canvas.height = imageHeight;

//     // Draw the image
//     this.context.drawImage(this.image, 0, 0);

//     // Scale and draw bounding boxes
//     this.drawBoundingShapesOnCanvas();
//   }

//   private drawBoundingShapesOnCanvas(): void {
//     if (this.linesDrawn) return; // Prevent re-drawing

//     if (this.context && this.objectData.length > 0) {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       this.context.drawImage(this.image, 0, 0);

//       this.objectData.forEach((bbox) => {
//         this.drawObjectBoundingBox(bbox);
//       });

//       this.linesDrawn = true;
//     }
//   }

//   private drawObjectBoundingBox(bbox: any): void {
//     if (this.context) {
//       const { X, Y, W, H, class_name } = bbox;

//       // Draw the bounding box
//       this.context.strokeStyle = 'red';
//       this.context.lineWidth = 2;
//       this.context.strokeRect(X, Y, W, H);

//       // Optionally, draw additional information
//       this.context.fillStyle = 'red';
//       this.context.font = '12px Arial';
//       this.context.fillText(class_name, X, Y - 5);
//     }
//   }
// }
