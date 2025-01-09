import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutsideImagesComponent } from './outside-images.component';

describe('OutsideImagesComponent', () => {
  let component: OutsideImagesComponent;
  let fixture: ComponentFixture<OutsideImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutsideImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OutsideImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
