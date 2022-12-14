import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';


@Component({
  selector: 'app-cadproduct',
  templateUrl: './cadproduct.component.html',
  styleUrls: ['./cadproduct.component.scss']
})
export class CadproductComponent implements OnInit {

  description : string = '';
  price: string = '';
  id = 0
  selectedGroup = 0;
  selectedSubGroup = 0;
  selectedCollection = 0
  nameGroup : String = '';
  nameSubGroup : String= '';
  nameCollection : String = ''
  fkgroup : number = 0;
  fksubgroup : number = 0;
  fkcollection : number = 0;

  public groups: Array<any> = [];
  public collections: Array<any> = [];
  public subgroups: Array<any> = [];
  public ids: Array<any> = [];
  
  constructor(private httpService : HttpService, public dialog: MatDialog) { }

  async ngOnInit(){
    this.groups = await this.httpService.get('group');
    this.subgroups = await this.httpService.get('subgroup');
    this.collections = await this.httpService.get('collection');
  }

  public async add(){
    console.log(this.selectedGroup);
    await this.httpService.post('product', {fksubgroup : this.selectedSubGroup, fkcollection : this.selectedCollection, fkgroup : this.selectedGroup, description :this.description, price :this.price});
  }

  public async found() {
    if (this.description.length < 0){
      console.log('Foi')
      this.groups = await this.httpService.get('subgroup');
      console.log(this.groups)
    }
  console.log('Nao entrou')
    
  }

  public onSelectGroup(event : any){
    console.log(event);
    console.log(this.selectedGroup);
  }
  // ==========================SUBGRUPO=============================
}
