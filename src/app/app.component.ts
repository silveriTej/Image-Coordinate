import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ParentComponent,
    ImageViewerComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ImageCoordinate';

  // Define violationDetails as an array of objects containing imagesData
  violationDetails: {
    imagesData: {
      imageSrc: string;
      shapes: { coordinates: { x: number; y: number }[] }[];
      objectData: any[];
    }[];
  }[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const page = 1;
    const size = 10;
    const departmentName = 'none';
    const fromDate = '2024-08-17 00:00:00';
    const toDate = '2024-10-05 23:59:59';

    this.apiService
      .getPages(page, size, departmentName, fromDate, toDate)
      .subscribe(
        (data) => {
          if (data && Array.isArray(data.message)) {
            for (const item of data.message) {
              if (item.crowdcountdetails && item.crowdcountdetails.bb_box) {
                const bboxes = item.crowdcountdetails.bb_box;
                if (typeof bboxes === 'string') {
                  const shapes = this.parseRoiBboxes(bboxes);
                  const imageSrc = this.apiService.getImageUrl(item.imagename);
                  const objectData = item.object_data;

                  // Push data to violationDetails, ensuring imagesData is an array
                  this.violationDetails.push({
                    imagesData: [{ imageSrc, shapes, objectData }],
                  });

                  console.log('push', this.violationDetails);
                } else {
                  console.warn('bboxes is not a string:', bboxes);
                }
              }
            }

            this.cdr.detectChanges();
          } else {
            console.warn('No valid data found');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  parseRoiBboxes(bboxes: string): { coordinates: { x: number; y: number }[] }[] {
    const shapeStrings = bboxes.split('|').filter((s) => s.trim() !== '');
    const shapes: { coordinates: { x: number; y: number }[] }[] = [];

    shapeStrings.forEach((shapeString) => {
      const points = shapeString.split(';').filter((p) => p.trim() !== '');
      const coordinates: { x: number; y: number }[] = [];

      for (let i = 0; i < points.length; i += 2) {
        const x = parseInt(points[i], 10);
        const y = parseInt(points[i + 1], 10);
        if (!isNaN(x) && !isNaN(y)) {
          coordinates.push({ x, y });
        }
      }

      if (coordinates.length > 0) {
        shapes.push({ coordinates });
      }
    });

    return shapes.map((shape) => ({
      coordinates: shape.coordinates.map((coord) => ({ x: coord.x, y: coord.y })),
    }));
  }
}
