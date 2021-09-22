import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoradadminComponent } from './boradadmin.component';

describe('BoradadminComponent', () => {
  let component: BoradadminComponent;
  let fixture: ComponentFixture<BoradadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoradadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoradadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
