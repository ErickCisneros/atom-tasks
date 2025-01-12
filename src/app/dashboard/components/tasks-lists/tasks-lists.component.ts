import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { Task } from '../../../types/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-lists',
  standalone: true,
  imports: [MatCard, MatCardTitle, CdkDropList, CdkDrag, DatePipe, MatIcon],
  templateUrl: './tasks-lists.component.html',
  styleUrl: './tasks-lists.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListsComponent implements OnInit, OnDestroy {
  private taskService = inject(TaskService);
  private subs = new Subscription();
  private cdr = inject(ChangeDetectorRef);

  todo: Task[] = [];
  done: Task[] = [];
  tasks$ = this.taskService.getTasks$();
  refreshTasks$ = this.taskService.onTasksRefresh();

  ngOnInit(): void {
    this.loadTasks();
    this.subs.add(this.refreshTasks$.subscribe(this.refreshTasks));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  editTask(task: Task) {
    this.taskService.tasksSubject.next(task);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask$(task.id).subscribe(this.refreshTasks);
  }

  private loadTasks() {
    this.subs.add(this.tasks$.subscribe(this.getTasks));
  }

  private getTasks = (tasks: Task[]) => {
    this.todo = tasks.filter((task) => !task.completedAt);
    this.done = tasks.filter((task) => task.completedAt);
    this.cdr.markForCheck();
  };

  private refreshTasks = () => {
    this.loadTasks();
  };
}
