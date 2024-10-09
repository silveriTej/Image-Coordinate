// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private apiUrl = 'http://10.11.1.160:5001/datewiseCC';
//   private imageurl = 'http://10.11.1.160:5000/image/CRDCNT/';
//   constructor(private http: HttpClient) {}

//   getPosts(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }
//   getImage(imageName: string): Observable<Blob> {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.get<Blob>(`${this.imageurl}${imageName}`, {
//       headers,
//       responseType: 'blob' as 'json',
//     });
//   }

//   getPages(
//     page: number,
//     size: number,
//     department_name: string,
//     from_date: string,
//     to_date: string
//   ): Observable<any> {
//     const url = `${this.apiUrl}/${page}/${size}`;
//     const body = {
//       department_name: department_name,
//       from_date: from_date,
//       to_date: to_date,
//     };

//     return this.http.post<any>(url, body);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://10.11.2.129:7500/datewiseCC'; 
  private imageurl = 'http://10.11.2.129:7500/image/CRDCNT/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getImage(imageName: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Blob>(`${this.imageurl}${imageName}`, {
      headers,
      responseType: 'blob' as 'json',
    });
  }

  getImageUrl(imageName: string): string {
    return `${this.imageurl}${imageName}`;
  }

  getPages(
    page: number,
    size: number,
    department_name: string,
    from_date: string,
    to_date: string
  ): Observable<any> {
    const url = `${this.apiUrl}/${page}/${size}`;
    const body = {
      department_name: department_name,
      from_date: from_date,
      to_date: to_date,
    };

    return this.http.post<any>(url, body);
  }
}
