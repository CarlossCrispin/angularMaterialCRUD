import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustumersComponent } from './list-custumers.component';

describe('ListCustumersComponent', () => {
  let component: ListCustumersComponent;
  let fixture: ComponentFixture<ListCustumersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustumersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
