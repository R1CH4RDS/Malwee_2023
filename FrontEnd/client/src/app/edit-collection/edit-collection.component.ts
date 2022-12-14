import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {
  id : number = 0;
  description : string = '';


  constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {

    if(this.data){
      this.id = this.data.id;
      this.description = this.data.description;
    }
  }

  public async change(){
    
    await this.httpService.put('collection', {description : this.description, id : this.data.id});
  }

  public cancel(){
    this.dialog.closeAll();
  }

}