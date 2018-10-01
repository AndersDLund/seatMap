import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndersMapComponent } from './anders-map.component';

describe('AndersMapComponent', () => {
  let component: AndersMapComponent;
  let fixture: ComponentFixture<AndersMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndersMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndersMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
