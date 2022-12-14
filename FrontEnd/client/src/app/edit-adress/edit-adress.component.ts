import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-edit-adress',
  templateUrl: './edit-adress.component.html',
  styleUrls: ['./edit-adress.component.scss']
})
export class EditAdressComponent implements OnInit {

  nameFantasy     : string = '';
  socialReason    : string = '';
  CNPJ            : string = '';
  clientSince     : string = '';
  id              : string = '';
  selectedClient  : number = 0;
  street          : String = ''
  city            : String = '';
  state           : String = '';
  cep             : string = '';
  number          : string = '';
  district        : String = '';
  fkclient        : number = 0
  complement      : String = '';
  ame             : String = '';  
  adress          : string = '';

  constructor(public httpClient: HttpClient, 
              public dialogRef: MatDialogRef<EditAdressComponent>,
              private question: QuestionService, 
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data){   
      this.nameFantasy  = this.data.nameFantasy
      this.socialReason = this.data.socialReason
      this.CNPJ         = this.data.CNPJ
      this.clientSince  = this.data.clientSince
      this.id           = this.data.id
      this.street       = this.data.street
      this.city         = this.data.city
      this.state        = this.data.state
      this.cep          = this.data.cep
      this.number       = this.data.number
      this.district     = this.data.district
      this.fkclient     = this.data.fkclient
      
    } 
  }

  public async addEndereco(){
    this.question.ask(async () => {
      const obj = {
        street      :this.street,
        district    :this.district,
        city        :this.city, 
        state       :this.state,
        cep         :this.cep, 
        number      :this.number, 
        complement  :this.complement
      }

      this.dialogRef.close(obj);
    })
  }

    onNoClick(): void {
      this.dialogRef.close();
    }

    public async reset(){
      this.district   = '',
      this.number     = '',
      this.complement = '',
      this.city       = '',
      this.state      = '',
      this.street     = '',
      this.cep        = '';
    }

    async procurarcep(){
      if(this.cep.length == 8){
       this.httpClient.get (`http://viacep.com.br/ws/${this.cep}/json/`).subscribe((response:any)=>{
        console.log(response)
        this.street     = response.logradouro
        this.district   = response.bairro
        this.city       = response.localidade
        this.state      = response.uf
       })
      }
    }
  }
