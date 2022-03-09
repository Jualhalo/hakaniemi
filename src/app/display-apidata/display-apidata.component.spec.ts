import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAPIDataComponent } from './display-apidata.component';

describe('DisplayAPIDataComponent', () => {
  let component: DisplayAPIDataComponent;
  let fixture: ComponentFixture<DisplayAPIDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAPIDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAPIDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
