import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeasonsComponent } from './list-seasons.component';

describe('ListSeasonsComponent', () => {
  let component: ListSeasonsComponent;
  let fixture: ComponentFixture<ListSeasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSeasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
