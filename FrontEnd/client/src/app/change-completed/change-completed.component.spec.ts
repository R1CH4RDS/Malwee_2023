import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCompletedComponent } from './change-completed.component';

describe('ChangeCompletedComponent', () => {
  let component: ChangeCompletedComponent;
  let fixture: ComponentFixture<ChangeCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
