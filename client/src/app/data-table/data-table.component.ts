import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  dataSource2 = new MatTableDataSource<DataTableItem>();
  items: DataTableItem[];
   data: DataTableItem[] = [
    {numberSold: 1, name: 'Hydrogasdfen', price: 20},
    {numberSold: 12, name: 'Hydroasdfgen', price: 20},
    {numberSold: 13, name: 'Hydrasdfogen', price: 20},
    {numberSold: 14, name: 'Hydrogadfsen', price: 20},
    {numberSold: 15, name: 'Hydroadsfgen', price: 20},
    {numberSold: 16, name: 'Hyasdfdrogen', price: 20},
  ];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'price', 'numberSold'];

  constructor(private storeService: EbayStoreService) {
    this.dataSource = new DataTableDataSource();
    //this.loadItems();
    
    
  }

  ngOnInit(): void {
    this.loadItems();


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
