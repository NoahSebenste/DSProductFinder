import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() inputItems: DataTableItem[];
  dataSource: DataTableDataSource;
  dataSource2 = new MatTableDataSource<DataTableItem>();
  items: DataTableItem[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['imgUrl', 'name', 'price', 'numberSold', 'url'];

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
