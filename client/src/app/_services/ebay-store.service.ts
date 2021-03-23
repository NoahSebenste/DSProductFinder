import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataTableItem } from '../data-table/data-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class EbayStoreService {
  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<DataTableItem[]>(this.baseUrl + 'Store'); 
  }
  
}
