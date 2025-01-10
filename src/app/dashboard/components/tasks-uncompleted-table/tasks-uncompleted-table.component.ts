import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-tasks-uncompleted-table',
  standalone: true,
  imports: [MatCard, MatCardContent],
  templateUrl: './tasks-uncompleted-table.component.html',
  styleUrl: './tasks-uncompleted-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksUncompletedTableComponent {}
