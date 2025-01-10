import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-tasks-completed-table',
  standalone: true,
  imports: [MatCard, MatCardContent],
  templateUrl: './tasks-completed-table.component.html',
  styleUrl: './tasks-completed-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCompletedTableComponent {}
