import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan-store',
  templateUrl: './scan-store.component.html',
  styleUrls: ['./scan-store.component.css']
})
export class ScanStoreComponent implements OnInit {
  items: any;
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.http.get(this.baseUrl + 'Store').subscribe(response => {
      this.items = response;
    }, error => {
      console.log(error);
    })
  }

}
