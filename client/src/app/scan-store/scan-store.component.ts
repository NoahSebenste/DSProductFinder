import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataTableItem } from '../data-table/data-table-datasource';
import { EbayStoreService } from '../_services/ebay-store.service';

@Component({
  selector: 'app-scan-store',
  templateUrl: './scan-store.component.html',
  styleUrls: ['./scan-store.component.css']
})
export class ScanStoreComponent implements OnInit {
  items: DataTableItem[];
  

  constructor(private storeService: EbayStoreService) { }

  ngOnInit(): void {
    //this.loadItems();
  }

 

  loadItems() {
    this.storeService.getItems().subscribe(items => {
      this.items = items;
    })
  }

}
