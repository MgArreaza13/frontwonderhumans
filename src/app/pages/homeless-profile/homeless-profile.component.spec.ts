import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomelessProfileComponent } from './homeless-profile.component';

describe('HomelessProfileComponent', () => {
  let component: HomelessProfileComponent;
  let fixture: ComponentFixture<HomelessProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomelessProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
