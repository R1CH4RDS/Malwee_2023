import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  groups : Array<any> =[]; 
  filterTerm: any;
  constructor(public dialogRef: MatDialogRef<any>, private httpService : HttpService) { }

  ngOnInit(): void {
    this.list()
  }

  yesClick(){
    this.dialogRef.close(true);
    this.list();
  }
  
  noClick(){
    this.dialogRef.close(false);
    this.list();
  }
  public async list(){
    this.groups = await this.httpService.get('group');
  }

}
