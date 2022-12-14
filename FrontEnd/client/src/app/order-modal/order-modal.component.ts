import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})

export class OrderModalComponent implements OnInit {
  selectedAdress  : number      = 0;
  filterTerm      : string      = '';
  selectedClient  : number      = 0; 
  clients         : Array<any>  =[];   
  adresses        : Array<any>  =[];   
  order           : any;
  adress          : any;
  clientseclected : Array<any>  =[];
  orders          : Array<any>  =[];   
  prodorders      : Array<any>  =[];
  DTemission      : String      = '';
  DTdelivery      : String      = '';

  
  constructor(public httpClient: HttpClient, public dialogRef: MatDialogRef<OrderModalComponent>,private httpService : HttpService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data : any, private question: QuestionService) { }


  async ngOnInit() {
    this.clients = await this.httpService.get('client');
    this.reset();
    await this.loadOrder();
  }

  public title(){
    let result = 'Pedido'
    if (this.order && this.order.id > 0){
        result = result + ': ' + this.order.id
    }
    return result;
  }

  private async loadOrder(){
    if (!this.data || this.data.id <= 0){
      return;
    }
    
    const order = await this.httpService.get('order/' + this.data.id);

    if (!order){
      return;
    }
    this.order = order;

  }

  public async onSelectClient(event : any){
    console.log(event);
    this.loadAdress();
    // this.clientseclected = await this.httpService.get('client/' + this.selectedClient);
  }

  public onSelectAdress(event : any){
    console.log(event);

  }


  private async loadAdress(){
    if (!this.selectedClient || this.selectedClient <= 0){
      return;
    }

    const customer = await this.httpService.get('client/' + this.selectedClient);

    if (!customer){
      return;
    }

    this.adresses = customer.addresses;
    console.log(this.adresses)
  }

  public openModal(){
    const dialog = this.dialog.open(ProductModalComponent, {
      width: '450px',
    });

    dialog.afterClosed().subscribe((obj : any) => {
      debugger
      this.order.products.push(obj);
    })
  }

  public async list(){
    this.orders = await this.httpService.get('order');
    if (this.filterTerm.length > 0){
      this.orders = await this.httpService.get('order/' + this.filterTerm);
      console.log(this.clients)
    }
  }


  public async save(){
    const obj : any = {
      fkclient     : this.order.fkclient,
      DTemission   : this.order.DTemission,
      DTdelivery   : this.order.DTdelivery,
      fkadress     : this.order.fkadress,
      total        : this.order.total,
      Prodorder    : []
    }

    for(const Prodorder of this.order.prodorders){
      obj.prodorders.push({
        fkorder     : Prodorder.fkorder,
        fkproduct   : Prodorder.fkproduct,
        amount      : Prodorder.amount,
        UNITvalue   : Prodorder.UNITvalue,
        descont     : Prodorder.descont,
        addition    : Prodorder.addition,
        total       : Prodorder.total
      });
    }
    
    if (!this.order){      
      await this.httpService.post('order', obj);
    }

    if (this.order && this.order.id > 0){      
      obj.id = this.order.id;
      await this.httpService.put('order', obj);
    }
   
    this.closeModal()
  }


  closeModal(): void {
      this.dialogRef.close();
  }

      public async reset(){

        this.order = {
          DTdelivery  : '',
          DTemission  : '',
          createdAt   : '',
          fkadress    : '',
          fkclient    : '',
          id          : '',
          status      : '',
          total       : '',
          updatedAt   : '',
          products    : []
         
        }
      }
  }

