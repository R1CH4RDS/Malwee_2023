import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  groupEDIT : string = '';
  description : string = '';
  descriptionEDIT : string = '';
  
  constructor(private httpService : HttpService, public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) private data : {id: number, description : string, status : number}) { }

  ngOnInit(): void {
    console.log(this.data.id)
  }

  public async change(){
    await this.httpService.put('group', {description : this.descriptionEDIT});
    console.log("Editou")
  }

  public cancel(){
    this.dialog.closeAll();
  }

  public async edit(){
    await this.httpService.put('group', {description : this.description, id : this.data.id});
  }

}

