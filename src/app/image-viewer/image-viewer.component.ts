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
export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() imageSrc: string = '';
  @Input() coordinates: { x: number; y: number }[] = [];

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
}
