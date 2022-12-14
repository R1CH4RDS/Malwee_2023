import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throws } from 'assert';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  products         : Array<any> =[]; 
  prodorders       : Array<any> =[]; 
  selectedProduct  : number = 0; 
  product          : any;
  obj              : any; 
  originalPrice    : number = 0;
  description      : string = '';
  amount           : number = 0;
  descont          : number = 0;
  unitvalue        : number = 0;
  addition         : number = 0;
  total            : number = 0;
  
  constructor(public httpClient: HttpClient, public dialogRef: MatDialogRef<ProductModalComponent>,private httpService : HttpService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : any, private question: QuestionService) { }

  async ngOnInit() {
    this.products = await this.httpService.get('product');
  }

  public async onSelectProduct(event : any){
    await this.loadProduct();
    this.calcular();
  }

  public async reset(){
    this.obj = {
      selectedProduct : '',
      addition        : '',
      descont         : '',
      amount          : '',
    }
  }

  public async addProdorder(){
       const obj = {
        name          :this.product.description,
        fkproduct     :this.selectedProduct,
        amount        :this.amount, 
        price         :this.unitvalue,
        descont       :this.descont, 
        addition      :this.addition, 
        total         :this.total
      }
      
      this.dialogRef.close(obj);
    }

  public async calcular() {
    if (this.originalPrice <= 0){
      return;
    }

    const discount   = this.originalPrice * this.descont  / 100;
    const additional = this.originalPrice * this.addition / 100; 

    this.unitvalue   = this.originalPrice - discount + additional;
    this.total       = this.unitvalue     * this.amount;
  }

  private async loadProduct(){
    if (!this.selectedProduct || this.selectedProduct <= 0){
      return;
    }

    const result = await this.httpService.get('product/' + this.selectedProduct);

    if (result && result.length != 1){
      return;
    }

    this.product = result[0];

    this.originalPrice = 0;
    if (this.product){
      this.originalPrice = this.product.price;
    }
  }

}
