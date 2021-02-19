import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
 export class DataService{
   constructor(private http: HttpClient){}
  getAllData() {
    return this.http.post(`https://core.nekta.cloud/api/device/metering_devices`, '');
  }
 }