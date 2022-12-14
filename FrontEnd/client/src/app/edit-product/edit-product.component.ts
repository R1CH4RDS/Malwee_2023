import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  id : string = '';
  description : string = '';
  price : string = '';
  selectedGroup : string = '';
  selectedSubGroup : string = '';
  selectedCollection : string = '';

  groups : Array<any> = [];
  subgroups : Array<any> = [];
  collections : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  async ngOnInit() {
    this.groups = await this.httpService.get('group');
    this.subgroups = await this.httpService.get('subgroup');
    this.collections = await this.httpService.get('collection');
    if(this.data){
      this.description = this.data.description;
      this.price = this.data.price;
      this.selectedGroup = this.data.selectedGroup;
      this.selectedSubGroup = this.data.selectedSubGroup;
      this.selectedCollection = this.data.selectedCollection;
    }
  }

  public async change(){
    await this.httpService.put('product', {description : this.description, price:  this.price, 
      fkgroup : this.selectedGroup, fksubgroup : this.selectedSubGroup, fkcollection : this.selectedCollection, id : this.data.id});
  }

  public cancel(){
    this.dialog.closeAll();
  }

}