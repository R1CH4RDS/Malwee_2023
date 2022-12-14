import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-collection-modal',
  templateUrl: './collection-modal.component.html',
  styleUrls: ['./collection-modal.component.scss']
})
export class CollectionModalComponent implements OnInit {
  description : string = '';
  public collections: Array<any> = [];
  public ids: Array<any> = [];
  httpClient: any;

  constructor(private httpService : HttpService, public dialog: MatDialog, httpClient : HttpClient) { }

  ngOnInit(): void {
  }
  public async add(){
    console.log({description : this.description});
    await this.httpService.post('collection', {description : this.description});
  }


}
