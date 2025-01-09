import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsideContainerComponent } from './inside-container.component';

describe('InsideContainerComponent', () => {
  let component: InsideContainerComponent;
  let fixture: ComponentFixture<InsideContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsideContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsideContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
