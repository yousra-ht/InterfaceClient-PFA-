import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceLabviewComponent } from './interface-labview.component';

describe('InterfaceLabviewComponent', () => {
  let component: InterfaceLabviewComponent;
  let fixture: ComponentFixture<InterfaceLabviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceLabviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceLabviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
