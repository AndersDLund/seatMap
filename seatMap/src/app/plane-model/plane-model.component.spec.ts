import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneModelComponent } from './plane-model.component';

describe('PlaneModelComponent', () => {
  let component: PlaneModelComponent;
  let fixture: ComponentFixture<PlaneModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaneModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaneModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
