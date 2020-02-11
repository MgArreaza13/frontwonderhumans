import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHomelessComponent } from './new-homeless.component';



describe('NewHomelessComponent', () => {
  let component: NewHomelessComponent;
  let fixture: ComponentFixture<NewHomelessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomelessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomelessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
