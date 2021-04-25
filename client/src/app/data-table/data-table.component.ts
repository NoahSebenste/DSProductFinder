import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EbayStoreService } from '../_services/ebay-store.service';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  @Input() inputItems: DataTableItem[] = [];
  dataSource: DataTableDataSource;
  dataSource2 = new MatTableDataSource<DataTableItem>();
  items: DataTableItem[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['imgUrl', 'name', 'price', 'timeFrameSold' ,'numberSold', 'url'];

  constructor(private storeService: EbayStoreService) {
    this.dataSource = new DataTableDataSource();
 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log("child input items");
      console.log(this.inputItems);
      this.dataSource2.data = this.inputItems.slice();

      this.dataSource2.data = this.dataSource2.data;
  }

  ngOnInit(): void {
 
  }

  loadItems() {
    this.storeService.getItems().subscribe(items => {
      this.dataSource2.data = items;
      this.items = items;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
    this.table.dataSource = this.dataSource2;
  }
}
