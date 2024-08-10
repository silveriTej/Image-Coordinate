import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://10.11.1.160:5001/live_data1CC';
  private imageurl = 'http://10.11.1.160:5000/image/CRDCNT/';
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
}
