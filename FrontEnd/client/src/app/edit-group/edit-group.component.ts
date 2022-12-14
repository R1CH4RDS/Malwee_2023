import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  id : string = '';
  description : string = '';

  groups : Array<any> = [];


  constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.groups = await this.httpService.get('group');
    if(this.data){
      this.description = this.data.description;
    }
  }

  public async change(){
    await this.httpService.put('group', {description : this.description, id : this.data.id});
  }

  public cancel(){
    this.dialog.closeAll();
  }

}
