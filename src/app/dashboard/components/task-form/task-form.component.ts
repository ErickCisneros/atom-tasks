import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { Task } from '../../../types/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit, OnDestroy {
  private taskService = inject(TaskService);
  private fb = inject(NonNullableFormBuilder);
  private subs = new Subscription();
  private taskId: string | null = null;

  form = this.fb.group({
    title: this.fb.control(''),
    description: this.fb.control(''),
  });

  get validatedForm() {
    return (
      this.form.controls.title.value && this.form.controls.description.value
    );
  }

  ngOnInit() {
    this.subs.add(this.taskService.onEditTask$().subscribe(this.getTask));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit() {
    const task: Partial<Task> = this.form.value;

    if (this.taskId) {
      this.subs.add(
        this.taskService.putTask$(this.taskId, task).subscribe(this.clearForm),
      );

      return;
    }

    this.subs.add(
      this.taskService
        .postTask$({ ...task, createdAt: new Date() })
        .subscribe(this.clearForm),
    );
  }

  private getTask = (task: Task) => {
    this.taskId = task.id;
    this.form.patchValue(task);
  };

  private clearForm = () => {
    this.taskId = null;
    this.form.reset();
  };
}
