import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksUncompletedTableComponent } from './tasks-uncompleted-table.component';

describe('TasksUncompletedTableComponent', () => {
  let component: TasksUncompletedTableComponent;
  let fixture: ComponentFixture<TasksUncompletedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksUncompletedTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksUncompletedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
