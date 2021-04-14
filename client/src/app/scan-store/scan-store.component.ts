import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTableItem } from '../data-table/data-table-datasource';
import { EbayStoreService } from '../_services/ebay-store.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-scan-store',
  templateUrl: './scan-store.component.html',
  styleUrls: ['./scan-store.component.css']
})
export class ScanStoreComponent implements OnInit {
  items: DataTableItem[];
  model: any = {};

  constructor(private storeService: EbayStoreService) { }

  ngOnInit(): void {

  }

 

  loadItems() {
    this.storeService.getItems().subscribe(items => {
      this.items = items;
    })
  }

  scanStore() {
    console.log(this.model);
    this.storeService.getItems().subscribe(items => {
      this.items = items;
      console.log("displaying fetched items from form");
      console.log(this.items);
    })

  }


}
