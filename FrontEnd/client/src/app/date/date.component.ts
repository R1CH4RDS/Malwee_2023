import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  @Input() label : string = '';
  @Input() required : boolean = false;
  @Output() input = new EventEmitter<any>();
  @Input() id : string = '';
  @Input() readonly : boolean = false;

  private _value = '';

  public get value() : string{
      return this._value;
  }
  public set value(v : string){
      if(v != this._value){
          this._value = v;
          this.onChange(v);
          this.onTouched();
      }
  }

  onChange = (_ : any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this._value = value;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (this.required){
      this.label = this.label;
    }
  }
}
