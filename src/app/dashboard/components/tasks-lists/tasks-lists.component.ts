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
import { finalize, Subscription } from 'rxjs';
import { ListEnum } from '../../../types/list.enum';
import { MessagesEnum } from '../../../types/messages.enum';
import { Task } from '../../../types/task';
import { SnackbarsService } from '../../services/snackbars.service';
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
  private snackbarsService = inject(SnackbarsService);
  private subs = new Subscription();
  private cdr = inject(ChangeDetectorRef);
  private tasks$ = this.taskService.getTasks$();
  private refreshTasks$ = this.taskService.onTasksRefresh();

  todo: Task[] = [];
  done: Task[] = [];
  list = ListEnum;

  ngOnInit(): void {
    this.loadTasks();
    this.subs.add(this.refreshTasks$.subscribe(this.refreshTasks));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  drop(event: CdkDragDrop<Task[]>, list: ListEnum) {
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

      const task: Task = {
        ...event.item.data,
        completedAt: ListEnum.DONE === list ? new Date() : null,
      };
      this.subs.add(
        this.taskService
          .putTask$(task.id, task)
          .subscribe(() =>
            this.snackbarsService.openSnackbar(MessagesEnum.COMPLETED),
          ),
      );
    }
  }

  editTask(task: Task) {
    this.taskService.tasksSubject.next(task);
  }

  completeTask(task: Task) {
    this.subs.add(
      this.taskService
        .putTask$(task.id, { ...task, completedAt: new Date() })
        .subscribe(() =>
          this.snackbarsService.openSnackbar(MessagesEnum.COMPLETED),
        ),
    );
  }

  deleteTask(task: Task) {
    this.subs.add(
      this.taskService
        .deleteTask$(task.id)
        .pipe(
          finalize(() =>
            this.snackbarsService.openSnackbar(MessagesEnum.DELETED),
          ),
        )
        .subscribe(this.refreshTasks),
    );
  }

  private loadTasks() {
    this.subs.add(this.subs.add(this.tasks$.subscribe(this.getTasks)));
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
