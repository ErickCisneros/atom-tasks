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
import { Subscription } from 'rxjs';
import { Task } from '../../../types/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-lists',
  standalone: true,
  imports: [MatCard, MatCardTitle, CdkDropList, CdkDrag, DatePipe],
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
  tasks$ = this.taskService.getTasks();

  ngOnInit(): void {
    this.subs.add(this.tasks$.subscribe(this.getTasks));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        this.todo,
        this.done,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  private getTasks = (tasks: Task[]) => {
    this.todo = tasks.filter((task) => !task.isCompleted);
    this.done = tasks.filter((task) => task.isCompleted);
    this.cdr.markForCheck();
  };
}
