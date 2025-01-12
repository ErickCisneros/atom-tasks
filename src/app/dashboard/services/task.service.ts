import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Task } from '../../types/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly BASE_API = environment.BASE_API;
  private httpClient = inject(HttpClient);
  private refreshTasksSubject = new Subject<void>();

  tasksSubject = new Subject<Task>();

  getTasks$() {
    return this.httpClient.get<Task[]>(`${this.BASE_API}/tasks`);
  }

  postTask$(task: Partial<Task>) {
    return this.httpClient
      .post<Task>(`${this.BASE_API}/tasks`, task)
      .pipe(tap(() => this.notifyTasksRefresh()));
  }

  putTask$(taskId: string, task: Partial<Task>) {
    return this.httpClient
      .put<Task>(`${this.BASE_API}/tasks/${taskId}`, task)
      .pipe(tap(() => this.notifyTasksRefresh()));
  }

  deleteTask$(taskId: string) {
    return this.httpClient.delete<Task>(`${this.BASE_API}/tasks/${taskId}`);
  }

  onEditTask$() {
    return this.tasksSubject.asObservable();
  }

  notifyTasksRefresh() {
    this.refreshTasksSubject.next();
  }

  onTasksRefresh() {
    return this.refreshTasksSubject.asObservable();
  }
}
