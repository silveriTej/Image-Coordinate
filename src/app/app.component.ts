// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { ParentComponent } from './parent/parent.component';
// import { ImageViewerComponent } from './image-viewer/image-viewer.component';
// import { ApiService } from './api.service';
// import { HttpClientModule } from '@angular/common/http';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     RouterOutlet,
//     ParentComponent,
//     ImageViewerComponent,
//     HttpClientModule,
//   ],
//   providers: [ApiService],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
// })
// export class AppComponent implements OnInit {
//   title = 'ImageCoordinate';
//   imageSrc = 'test.jpeg'; // Provide the path to your image
//   // coordinates = [
//   //   { x1: 50, y1: 60, x2: 150, y2: 100 },
//   //   { x1: 200, y1: 200, x2: 300, y2: 300 },
//   //   { x1: 2, y1: 10, x2: 28, y2: 45 },
//   //   { x1: 200, y1: 200, x2: 300, y2: 300 },
//   // ];
//   coordinates: { x: number; y: number }[] = [];

//   constructor(private apiService: ApiService) {}

//   ngOnInit(): void {
//     this.apiService.getPosts().subscribe(
//       (data) => {
//         console.log('API Data:', data);

//         // Check if 'message' is present in the response and is an array
//         if (data && Array.isArray(data['message'])) {
//           console.log('Message Array:', data['message']);

//           // Iterate over each item in the message array
//           for (const item of data['message']) {
//             if (
//               item &&
//               item['analytics_data'] &&
//               item['analytics_data']['data'] &&
//               Array.isArray(item['analytics_data']['data'])
//             ) {
//               const analyticsData = item['analytics_data'];
//               console.log('Analytics Data:', analyticsData);

//               if (analyticsData['data'].length > 0) {
//                 const dataItem = analyticsData['data'][0];
//                 console.log('First Data Item:', dataItem);

//                 const bbox = dataItem['ROI_bbox'];
//                 console.log('ROI_bbox:', bbox);

//                 if (bbox) {
//                   this.coordinates = this.parseRoiBbox(bbox);
//                   console.log('Parsed Coordinates:', this.coordinates);
//                   // Exit the loop if you find the data you need
//                   break;
//                 }
//               }
//             }
//           }
//         } else {
//           console.warn('message property is missing or not an array');
//         }
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   // Function to parse the ROI_bbox string into coordinates
//   parseRoiBbox(bbox: string): { x: number; y: number }[] {
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

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './parent/parent.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ParentComponent,
    ImageViewerComponent,
    HttpClientModule,
  ],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ImageCoordinate';
  imageSrc = 'test.jpeg'; // Provide the path to your image
  coordinates: { x: number; y: number }[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.apiService.getPosts().subscribe(
      (data) => {
        console.log('API Data:', data);

        if (data && Array.isArray(data['message'])) {
          console.log('Message Array:', data['message']);

          for (const item of data['message']) {
            if (
              item &&
              item['analytics_data'] &&
              item['analytics_data']['data'] &&
              Array.isArray(item['analytics_data']['data'])
            ) {
              const analyticsData = item['analytics_data'];
              console.log('Analytics Data:', analyticsData);

              if (analyticsData['data'].length > 0) {
                const dataItem = analyticsData['data'][0];
                console.log('First Data Item:', dataItem);

                const bbox = dataItem['ROI_bbox'];
                console.log('ROI_bbox:', bbox);

                if (bbox) {
                  this.coordinates = this.parseRoiBbox(bbox);
                  console.log('Parsed Coordinates:', this.coordinates);

                  // Trigger change detection to ensure data binding
                  this.cdr.detectChanges();
                  break;
                }
              }
            }
          }
        } else {
          console.warn('message property is missing or not an array');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  parseRoiBbox(bbox: string): { x: number; y: number }[] {
    const points = bbox.split(';').filter((p) => p !== '');
    const coordinates: { x: number; y: number }[] = [];

    for (let i = 0; i < points.length; i += 2) {
      const x = parseInt(points[i], 10);
      const y = parseInt(points[i + 1], 10);
      coordinates.push({ x, y });
    }

    return coordinates;
  }
}
