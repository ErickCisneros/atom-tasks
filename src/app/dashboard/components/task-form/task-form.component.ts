import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
export class TaskFormComponent implements OnInit {
  private taskService = inject(TaskService);
  private submitting = false;

  private fb = inject(NonNullableFormBuilder);
  private taskId: string | null = null;

  public form = this.fb.group({
    title: this.fb.control('', {
      validators: [Validators.required],
    }),
    description: this.fb.control('', {
      validators: [Validators.required],
    }),
  });

  get validatedForm() {
    return this.form.dirty && this.form.valid && !this.submitting;
  }

  ngOnInit() {
    this.taskService.onEditTask$().subscribe((task) => {
      this.taskId = task.id;
      this.form.patchValue(task);
    });
  }

  onSubmit() {
    const task: Partial<Task> = this.form.value;

    if (this.taskId) {
      this.taskService.putTask$(this.taskId, task).subscribe(() => {
        this.taskId = null;
        this.form.reset();
      });

      return;
    }

    this.taskService.postTask$(task).subscribe(() => {
      this.form.reset();
    });
  }
}
