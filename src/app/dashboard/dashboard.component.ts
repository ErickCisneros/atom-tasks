import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InsideContainerComponent } from '../layout/components/inside-container/inside-container.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksCompletedTableComponent } from './components/tasks-completed-table/tasks-completed-table.component';
import { TasksUncompletedTableComponent } from './components/tasks-uncompleted-table/tasks-uncompleted-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    InsideContainerComponent,
    TaskFormComponent,
    TasksCompletedTableComponent,
    TasksUncompletedTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
