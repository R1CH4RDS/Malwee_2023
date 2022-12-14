import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ObjectUtils } from 'src/app/utils/ObjectUtils';
import { CadproductComponent } from '../cadproduct/cadproduct.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  groups : Array<any> =[]; 
  filterTerm : string = '';
  products : Array<any> =[]; 
  originalList : Array<any> = [];
  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){
    this.products = await this.httpService.get('product');
    ObjectUtils.copyArray(this.products, this.originalList)
  }

  public filterInput(){
    ObjectUtils.filterArray(this.products, this.originalList, this.filterTerm, 'description');
  }

  public openModal(){
    const dialog = this.dialog.open(CadproductComponent, {
      width: 'auto', height: 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(product : any){
    const dialog = this.dialog.open(EditProductComponent, {
      width: '450px',
      data : product
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   
  public async deleteSubGroup(id : number){
  this.question.ask(async () => {
    await this.httpService.patch('product', {id});
    this.list();
  })
  }    

}
