import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sub-group-modal',
  templateUrl: './sub-group-modal.component.html',
  styleUrls: ['./sub-group-modal.component.scss']
})
export class SubGroupModalComponent implements OnInit {
  description : string = '';
  subgroupname = '';
  descriptiongroup : string = '';
  id = 0
  selectedGroup : number = 0;
  fkgroup : number = 0;

  public subgroups: Array<any> = [];
  public groups: Array<any> = [];
  public ids: Array<any> = [];
  
  constructor(private httpService : HttpService, public dialog: MatDialog) { }

  async ngOnInit(){
    this.groups = await this.httpService.get('group');
  }

  public async add(){
    console.log(this.selectedGroup);
    await this.httpService.post('subgroup', {fkgroup : this.selectedGroup, description :this.description});
  }

  public async found() {
    if (this.description.length < 0){
      console.log('Foi')
      this.subgroups = await this.httpService.get('subgroup');
      console.log(this.subgroups)
    }
  console.log('Nao entrou')
    
  }

  public onSelectGroup(event : any){
    console.log(event);
    console.log(this.selectedGroup);
  }
  
 
}
