import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupModalComponent } from './sub-group-modal.component';

describe('SubGroupModalComponent', () => {
  let component: SubGroupModalComponent;
  let fixture: ComponentFixture<SubGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
