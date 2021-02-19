import { Component, OnInit } from '@angular/core';
import { Data } from '../shared/models/data.interface';
import { AuthService } from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  tableData: Data[];
  constructor(
    public authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getAllData().subscribe((data) => {
      this.tableData = data.data.metering_devices.data;
    });
  }
}
