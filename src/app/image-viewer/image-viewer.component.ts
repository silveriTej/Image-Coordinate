import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  ElementRef,
  ViewChild,
  SimpleChanges,
  OnChanges,
  QueryList,
  ViewChildren,
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
  styleUrls: ['./image-viewer.component.css'],
})
export class ImageViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() imagesData: {
    imageSrc: string;
    shapes: { coordinates: { x: number; y: number }[] }[];
    objectData: { position: { x1: number; y1: number }; label: string; confidence: number }[];
  }[] = [];

  @ViewChildren('imageElement') imageElements!: QueryList<ElementRef<HTMLImageElement>>;
  @ViewChildren('imageCanvas') imageCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  private imageLoaded: boolean[] = [];
  private imageNaturalWidth: number[] = [];
  private imageNaturalHeight: number[] = [];

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.setupCanvases();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagesData'] && !changes['imagesData'].firstChange) {
      this.redrawCanvases();
    }
  }

  setupCanvases(): void {
    this.imageElements.forEach((imageElement, index) => {
      const image = imageElement.nativeElement;
      const canvas = this.imageCanvases.toArray()[index]?.nativeElement;

      if (canvas) {
        image.onload = () => {
          console.log('Image loaded successfully');
          this.imageNaturalWidth[index] = image.naturalWidth;
          this.imageNaturalHeight[index] = image.naturalHeight;
          this.initializeCanvas(canvas, image, index);
          this.imageLoaded[index] = true;
          this.redrawCanvas(index);
        };

        if (image.complete) {
          this.imageNaturalWidth[index] = image.naturalWidth;
          this.imageNaturalHeight[index] = image.naturalHeight;
          this.initializeCanvas(canvas, image, index);
          this.imageLoaded[index] = true;
          this.redrawCanvas(index);
        } else {
          image.onerror = () => {
            console.error(`Error loading image: ${image.src}`);
          };
        }
      } else {
        console.error('Canvas element is not available.');
      }
    });
  }

  initializeCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement, index: number): void {
    const desiredWidth = 400;
    const desiredHeight = 300;
    const aspectRatio = image.naturalWidth / image.naturalHeight;

    canvas.width = aspectRatio > 1 ? desiredWidth : desiredHeight * aspectRatio;
    canvas.height = aspectRatio > 1 ? desiredWidth / aspectRatio : desiredHeight;

    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
  }

  redrawCanvas(index: number): void {
    const imageElement = this.imageElements.toArray()[index]?.nativeElement;
    const canvas = this.imageCanvases.toArray()[index]?.nativeElement;

    if (canvas && imageElement) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
        this.drawShapes(context, this.imagesData[index]?.shapes || []);
        this.drawLabels(context, this.imagesData[index]?.objectData || []);
      }
    }
  }

  redrawCanvases(): void {
    this.imageElements.forEach((_, index) => {
      this.redrawCanvas(index);
    });
  }

  drawShapes(context: CanvasRenderingContext2D, shapes: { coordinates: { x: number; y: number }[] }[]): void {
    shapes.forEach(shape => {
      const coordinates = shape.coordinates;
      if (coordinates.length > 0) {
        context.beginPath();
        context.moveTo(coordinates[0].x, coordinates[0].y);
        coordinates.forEach(coord => {
          context.lineTo(coord.x, coord.y);
        });
        context.closePath();
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.stroke();
      }
    });
  }

  drawLabels(context: CanvasRenderingContext2D, objectData: { position: { x1: number; y1: number }; label: string; confidence: number }[]): void {
    objectData.forEach(object => {
      const { position, label } = object;
      const text = `${label} (${object.confidence.toFixed(2)})`;
      const x = position.x1;
      const y = position.y1;

      context.fillStyle = 'white';
      context.fillRect(x, y - 20, context.measureText(text).width + 4, 20);
      context.fillStyle = 'black';
      context.fillText(text, x + 2, y);
    });
  }
}
