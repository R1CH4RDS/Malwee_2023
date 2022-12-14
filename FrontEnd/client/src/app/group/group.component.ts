import { Component, OnInit,  } from '@angular/core';  //AfterViewInit
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { QuestionService } from 'src/services/question.service';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { ObjectUtils } from 'src/app/utils/ObjectUtils';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit  { //AfterViewInit
  groups : Array<any> =[]; 
  filterTerm : string = '';
  originalList : Array<any> = [];

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list2();    
  }

  // ngAfterViewInit(): void {
  //   // FormUtils.setFocus('inputFilter');    
  // }

  public async list2(){
    this.groups = await this.httpService.get('group');
    ObjectUtils.copyArray(this.groups, this.originalList)
  }

  public filterInput(){
    ObjectUtils.filterArray(this.groups, this.originalList, this.filterTerm, 'description');
  }


  public async list(){
    this.groups = await this.httpService.get('group');
    if (this.filterTerm.length > 0){
      this.groups = await this.httpService.get('groupsearch/' + this.filterTerm);
      console.log(this.groups)
    }

  }

  public openModal(){
    const dialog = this.dialog.open(GroupModalComponent, {
      width: '450px',
   
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(group : any):any {
    const dialog = this.dialog.open(EditGroupComponent, {
      width: '450px',
      data : group
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   
  public async deleteGroup(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('group', {id});
      this.list();
    })
  }    

}

