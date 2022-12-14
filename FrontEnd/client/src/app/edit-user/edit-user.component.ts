import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  name : string = '';
  username : string = '';
  password : string = '';
  cpassword : string = '';
  
  
  constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  async ngOnInit() {
    if(this.data){
      this.name = this.data.name;
      this.username = this.data.username;
      this.password = this.data.password;
      this.cpassword = this.data.cpassword;

    }
  }
  
  public async change(){
    await this.httpService.put('user', {name : this.name, username:  this.username, 
      password : this.password, cpassword : this.cpassword, id : this.data.id});
  }
  
  public cancel(){
    this.dialog.closeAll();
  }
  
  }