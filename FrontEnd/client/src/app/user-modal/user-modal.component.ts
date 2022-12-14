import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  constructor(private httpService : HttpService) { }
  name : string = '';
  username : string = '';
  password : string = '';
  cpassword : string = '';

  ngOnInit(): void {
  }

  public async add(){
    await this.httpService.post('user', {name : this.name, username : this.username, password : this.password, cpassword : this.cpassword});
  }
}
