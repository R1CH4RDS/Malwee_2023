import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {
  description : string = '';
  groupname = '';
  public groups: Array<any> = [];
  public ids: Array<any> = [];
  
  constructor(private httpService : HttpService, public dialog: MatDialog, httpClient : HttpClient) { }

  ngOnInit(): void {

  }

  public async add(){
    console.log({description : this.description});
    await this.httpService.post('group', {description : this.description});
  }



 
}
