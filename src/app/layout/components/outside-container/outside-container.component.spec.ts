import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutsideContainerComponent } from './outside-container.component';

describe('OutsideContainerComponent', () => {
  let component: OutsideContainerComponent;
  let fixture: ComponentFixture<OutsideContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutsideContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutsideContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
