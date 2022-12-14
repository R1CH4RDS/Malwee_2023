import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-edit-sub-group',
  templateUrl: './edit-sub-group.component.html',
  styleUrls: ['./edit-sub-group.component.scss']
})
export class EditSubGroupComponent implements OnInit {
id : string = '';
description : string = '';
selectedGroup : string = '';

groups : Array<any> = [];
subgroups : Array<any> = [];

constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

async ngOnInit() {
  this.groups = await this.httpService.get('group');
  if(this.data){
    this.description = this.data.description;
    this.selectedGroup = this.data.selectedGroup;
  }
}

public async change(){
  await this.httpService.put('subgroup', {description : this.description, fkgroup : this.selectedGroup, id : this.data.id});
}

public cancel(){
  this.dialog.closeAll();
}

}