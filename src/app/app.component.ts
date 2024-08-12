// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { ParentComponent } from './parent/parent.component';
// import { ImageViewerComponent } from './image-viewer/image-viewer.component';
// import { ApiService } from './api.service';
// import { HttpClientModule } from '@angular/common/http';
// import { ChangeDetectorRef } from '@angular/core';

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
//   coordinates: { x: number; y: number }[] = [];

//   constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

//   ngOnInit(): void {
//     this.apiService.getPosts().subscribe(
//       (data) => {
//         console.log('API Data:', data);

//         if (data && Array.isArray(data['message'])) {
//           console.log('Message Array:', data['message']);

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

//                   // Trigger change detection to ensure data binding
//                   this.cdr.detectChanges();
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
  styleUrls: ['./app.component.css'],
})
// export class AppComponent implements OnInit {
//   title = 'ImageCoordinate';
//   imageSrc = 'test.jpeg'; // Provide the path to your image
//   coordinates: { x: number; y: number }[] = [];

//   constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

//   ngOnInit(): void {
//     this.fetchRoiBboxData();
//   }

//   fetchRoiBboxData(): void {
//     const page = 1;
//     const size = 10;
//     const department_name = 'none';
//     const from_date = '2024-08-09 00:00:00';
//     const to_date = '2024-08-09 23:59:59';

//     this.apiService
//       .getPages(page, size, department_name, from_date, to_date)
//       .subscribe(
//         (data) => {
//           console.log('API Data:', data);

//           if (data && Array.isArray(data['message'])) {
//             console.log('Message Array:', data['message']);

//             for (const item of data['message']) {
//               if (
//                 item &&
//                 item['analytics_data'] &&
//                 item['analytics_data']['data'] &&
//                 Array.isArray(item['analytics_data']['data'])
//               ) {
//                 const analyticsData = item['analytics_data'];
//                 console.log('Analytics Data:', analyticsData);

//                 if (analyticsData['data'].length > 0) {
//                   const dataItem = analyticsData['data'][0];
//                   console.log('First Data Item:', dataItem);

//                   const bbox = dataItem['ROI_bbox'];
//                   console.log('ROI_bbox:', bbox);

//                   if (bbox) {
//                     this.coordinates = this.parseRoiBbox(bbox);
//                     console.log('Parsed Coordinates:', this.coordinates);

//                     // Trigger change detection to ensure data binding
//                     this.cdr.detectChanges();
//                     break;
//                   }
//                 }
//               }
//             }
//           } else {
//             console.warn('message property is missing or not an array');
//           }
//         },
//         (error) => {
//           console.error('Error fetching data:', error);
//         }
//       );
//   }

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

//important for images
// export class AppComponent implements OnInit {
//   title = 'ImageCoordinate';
//   imageSrc: string = ''; // The image source path
//   coordinates: { x: number; y: number }[] = [];

//   constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

//   ngOnInit(): void {
//     // Replace with the actual parameters for your POST request
//     const page = 1;
//     const size = 10;
//     const departmentName = 'none';
//     const fromDate = '2024-08-05 00:00:00';
//     const toDate = '2024-08-05 23:59:59';

//     this.apiService
//       .getPages(page, size, departmentName, fromDate, toDate)
//       .subscribe(
//         (data) => {
//           console.log('API Data:', data);

//           if (data && Array.isArray(data.message)) {
//             console.log('Message Array:', data.message);

//             for (const item of data.message) {
//               if (item.crowdcountdetails && item.crowdcountdetails.bb_box) {
//                 const bbox = item.crowdcountdetails.bb_box;
//                 this.coordinates = this.parseRoiBbox(bbox);
//                 this.imageSrc = this.apiService.getImageUrl(item.imagename[0]);
//                 this.cdr.detectChanges(); // Trigger change detection to update the view
//                 break; // Assuming you want to use the first matching data
//               }
//             }
//           } else {
//             console.warn('No valid data found');
//           }
//         },
//         (error) => {
//           console.error('Error fetching data:', error);
//         }
//       );
//   }

//   // Function to parse the ROI_bbox string into coordinates
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
// export class AppComponent implements OnInit {
//   title = 'ImageCoordinate';
//   imageSrc = 'test.jpeg'; // The image source path
//   coordinates: { x: number; y: number }[] = [];
//   objectData: any[] = []; // Add this line to store object data

//   constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

//   ngOnInit(): void {
//     const page = 1;
//     const size = 10;
//     const departmentName = 'none';
//     const fromDate = '2024-08-05 00:00:00';
//     const toDate = '2024-08-05 23:59:59';

//     this.apiService
//       .getPages(page, size, departmentName, fromDate, toDate)
//       .subscribe(
//         (data) => {
//           console.log('API Data:', data);

//           if (data && Array.isArray(data.message)) {
//             console.log('Message Array:', data.message);

//             for (const item of data.message) {
//               if (item.crowdcountdetails && item.crowdcountdetails.bb_box) {
//                 const bbox = item.crowdcountdetails.bb_box;
//                 this.coordinates = this.parseRoiBbox(bbox);
//                 // this.imageSrc = this.apiService.getImageUrl(item.imagename[0]);
//                 this.objectData = item.object_data;
//                 // Set object_data
//                 console.log(this.objectData);
//                 this.cdr.detectChanges(); // Trigger change detection to update the view
//                 break; // Assuming you want to use the first matching data
//               }
//             }
//           } else {
//             console.warn('No valid data found');
//           }
//         },
//         (error) => {
//           console.error('Error fetching data:', error);
//         }
//       );
//   }

//   // Function to parse the ROI_bbox string into coordinates
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
export class AppComponent implements OnInit {
  title = 'ImageCoordinate';
  imageSrc = 'maingate.jpg'; // The image source path
  coordinates: { x: number; y: number }[] = [];
  objectData: any[] = []; // To handle object data

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Replace with the actual parameters for your POST request
    const page = 1;
    const size = 10;
    const departmentName = 'none';
    const fromDate = '2024-08-09 00:00:00';
    const toDate = '2024-08-09 23:59:59';

    this.apiService
      .getPages(page, size, departmentName, fromDate, toDate)
      .subscribe(
        (data) => {
          console.log('API Data:', data);

          if (data && Array.isArray(data.message)) {
            console.log('Message Array:', data.message);

            for (const item of data.message) {
              if (item.crowdcountdetails && item.crowdcountdetails.bb_box) {
                const bbox = item.crowdcountdetails.bb_box;
                this.coordinates = this.parseRoiBbox(bbox);
                // this.imageSrc = this.apiService.getImageUrl(item.imagename[0]);
                this.objectData = item.object_data; // Assign object data

                this.cdr.detectChanges(); // Trigger change detection to update the view
                break; // Assuming you want to use the first matching data
              }
            }
          } else {
            console.warn('No valid data found');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  // Function to parse the ROI_bbox string into coordinates
  private parseRoiBbox(bbox: string): { x: number; y: number }[] {
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
