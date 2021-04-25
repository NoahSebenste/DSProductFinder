import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTableItem } from '../data-table/data-table-datasource';
import { EbayStoreService } from '../_services/ebay-store.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { BusyService } from '../_services/busy.service';

@Component({
  selector: 'app-scan-store',
  templateUrl: './scan-store.component.html',
  styleUrls: ['./scan-store.component.css']
})
export class ScanStoreComponent implements OnInit {
  items: DataTableItem[];
  observableItems: Observable<DataTableItem[]>;
  model: any = {};

  constructor(private storeService: EbayStoreService, private busyService: BusyService) { }

  ngOnInit(): void {

  }

 

  loadItems() {
    this.storeService.getItems().subscribe(items => {
      this.items = items;
    })
  }

  isBusy(): boolean {
    return this.busyService.busyRequestCount > 0;
  }

  scanStore() {

    

    this.storeService.getItems().subscribe(items => {
      let minQuantitySold = this.model.minQuantitySold;
      let maxQuantitySold = this.model.maxQuantitySold;
      let minPrice = this.model.minPrice;
      let maxPrice = this.model.maxPrice;

      let filteredItems = items;
      
      console.log(this.model);
      

      if(minQuantitySold !== null && minQuantitySold !== undefined && !isNaN(minQuantitySold) && minQuantitySold !== "")
      {
        filteredItems = filteredItems.filter(function (e) {
          console.log(e.soldData);
          return e.numberSold >= minQuantitySold;
        });
      }

      if(maxQuantitySold !== null && maxQuantitySold !== undefined && !isNaN(maxQuantitySold) && maxQuantitySold !== "")
      {
        filteredItems = filteredItems.filter(function (e) {
          return e.numberSold <= maxQuantitySold;
        });
      }

      if(minPrice !== null && minPrice !== undefined && !isNaN(minPrice) && minPrice !== "")
      {
        filteredItems = filteredItems.filter(function (e) {
          return e.price >= minPrice;
        });
      }

      if(maxPrice !== null && maxPrice !== undefined && !isNaN(maxPrice) && maxPrice !== "")
      {
        filteredItems = filteredItems.filter(function (e) {
          return e.price <= maxPrice;
        });
      }
     
      this.items = filteredItems;
      console.log("Parent items");
      //items[0].soldTimeFrame = 4;
      //console.log(items[0].soldTimeFrame);
    });


  }



}
