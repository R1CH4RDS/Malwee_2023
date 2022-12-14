import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAdressComponent } from './client-adress.component';

describe('ClientAdressComponent', () => {
  let component: ClientAdressComponent;
  let fixture: ComponentFixture<ClientAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
