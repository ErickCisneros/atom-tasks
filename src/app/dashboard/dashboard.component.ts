import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InsideContainerComponent } from '../layout/components/inside-container/inside-container.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksListsComponent } from './components/tasks-lists/tasks-lists.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InsideContainerComponent, TaskFormComponent, TasksListsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {}
