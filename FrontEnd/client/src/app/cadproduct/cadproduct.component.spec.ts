import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadproductComponent } from './cadproduct.component';

describe('CadproductComponent', () => {
  let component: CadproductComponent;
  let fixture: ComponentFixture<CadproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
