import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-client-adress',
  templateUrl: './client-adress.component.html',
  styleUrls: ['./client-adress.component.scss']
})
export class ClientAdressComponent implements OnInit {

  nameFantasy : string = '';
  socialReason : string = '';
  CNPJ : string = '';
  clientSince : string = '';
  id : string = '';


  constructor(public dialogRef: MatDialogRef<ClientAdressComponent>,private httpService : HttpService,
     public dialog: MatDialog, private question: QuestionService, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data){   
      this.nameFantasy = this.data.nameFantasy
      this.socialReason = this.data.socialReason
      this.CNPJ = this.data.CNPJ
      this.clientSince =this.data.clientSince
      this.id =this.data.id
    } 
  }

  selectedClient = 0;
  street : String = ''
  city: String = '';
  state: String = '';
  cep = '';
  number = '';
  district : String = '';
  fkclient : number = 0
  complement : String = '';
  name : String = '';
  address : Array<any> = [];
  clients : Array<any> = [];
  adress : string = '';

  public async addEndereco(){
    this.question.ask(async () => {
    this.address.push({street:this.street,district:this.district, city:this.city, state:this.state,
    cep:this.cep, number:this.number, complement:this.complement})
    this.reset();
    console.log(this.address);
  })
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public async reset(){
      this.district= '',
      this.number= '',
      this.complement= '',
      this.city= '',
      this.state= '',
      this.street= '',
      this.cep = '';
    }

    public async add(){
      this.clients =  await this.httpService.post('address', {address : this.address, nameFantasy : this.nameFantasy, socialReason:  this.socialReason, CNPJ : this.CNPJ, clientSince : this.clientSince, 'id' : this.id})
        this.onNoClick()
    }
}
