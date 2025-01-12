import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Task } from '../../types/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly BASE_API = environment.BASE_API;
  private httpClient = inject(HttpClient);

  getTasks() {
    return this.httpClient.get<Task[]>(`${this.BASE_API}/tasks`);
  }

  postTask(task: Partial<Task>) {
    return this.httpClient.post<Task>(`${this.BASE_API}/tasks`, task);
  }
}
