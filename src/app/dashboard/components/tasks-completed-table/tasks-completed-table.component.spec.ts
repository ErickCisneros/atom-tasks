import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksCompletedTableComponent } from './tasks-completed-table.component';

describe('TasksCompletedTableComponent', () => {
  let component: TasksCompletedTableComponent;
  let fixture: ComponentFixture<TasksCompletedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCompletedTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksCompletedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
