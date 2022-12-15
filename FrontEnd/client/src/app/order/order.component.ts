import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { ObjectUtils } from '../utils/ObjectUtils';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders : Array<any> =[]; 
  Prodorders : Array<any> = [];
  fkclient = '';
  DTemission = '';
  DTdelivery = '';
  fkadress = '';
  total = 0;
  filterTerm : string = '';
  originalList : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){
    this.orders = await this.httpService.get('order');
    if (this.filterTerm.length > 0){
      this.orders = await this.httpService.get('order/' + this.filterTerm);
      console.log(this.orders)
    }
  }

  public openModal(){
    const dialog = this.dialog.open(OrderModalComponent, {
      width: '800px',
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(order : any){
    const dialog = this.dialog.open(OrderModalComponent, {
      width : '800px',
      data  : {id : order.id}
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openaddadress(order : any){
    const dialog = this.dialog.open(OrderModalComponent, {
      width: '450px',
      data : order
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async deleteGroup(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('order', {id});
      console.log(Response);
      this.list();
    })
  } 

  public async deleteAdress(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('adress', {id});
      console.log(Response);
     })
  } 

  public filterInput(){
    ObjectUtils.filterArray(this.orders, this.originalList, this.filterTerm, 'ProdOrder');
   }
}
