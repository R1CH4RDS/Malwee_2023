import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdressComponent } from './edit-adress.component';

describe('EditAdressComponent', () => {
  let component: EditAdressComponent;
  let fixture: ComponentFixture<EditAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
