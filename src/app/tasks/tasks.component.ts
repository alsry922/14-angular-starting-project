import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';

import {TaskComponent} from './task/task.component';
import {Task} from './task/task.model';
import {ActivatedRoute, ResolveFn, RouterLink} from "@angular/router";
import {TasksService} from "./tasks.service";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  @Input({required: true}) userTasks: Task[] = [];
  // @Input() order?: 'asc' | 'desc';
  @Input({required: true}) order?: 'asc' | 'desc' = 'desc';
  private activatedRoute = inject(ActivatedRoute);
  private tasksService = inject(TasksService);
  private destroyRef = inject(DestroyRef);
}

export const userTasksResolver: ResolveFn<Task[]> = (activatedRouteSnapshot, routerStateSnapshot) => {
  const order = activatedRouteSnapshot.queryParams['order'] ?? 'desc';
  const userId = activatedRouteSnapshot.paramMap.get('userId');
  const taskService = inject(TasksService);
  const userTasks = taskService.allTasks().filter(task => task.userId === userId);
  return userTasks.sort((a, b) => {
    if (order === 'desc') {
      return a.id > b.id ? -1 : 1;
    } else {
      return a.id > b.id ? 1 : -1;
    }
  });
}

export const orderResolver: ResolveFn<'asc' | 'desc'> = (activatedRouteSnapshot, routerStateSnapshot) => {
  const order = activatedRouteSnapshot.queryParams['order'] ?? 'desc';
  return order;
}
