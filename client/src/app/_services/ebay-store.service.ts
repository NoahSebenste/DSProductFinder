import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataTableItem } from '../data-table/data-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class EbayStoreService {
  baseUrl = environment.apiUrl
  items: DataTableItem[] = [];
  
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<DataTableItem[]>(this.baseUrl + 'Store'); 
  }

  getObservableItems() {
    return this.http.get<DataTableItem[]>(this.baseUrl + 'Store').pipe(
      map(items => {
        this.items = items;
        return items;
      })
    );
  }
  
  
}
