import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';

import {TaskComponent} from './task/task.component';
import {Task} from './task/task.model';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userTasks: Task[] = [];
  // @Input() order?: 'asc' | 'desc';
  order?: 'asc' | 'desc';
  private activatedRoute = inject(ActivatedRoute);
  private tasksService = inject(TasksService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userTasks =
          this.tasksService.allTasks().filter(task => task.userId === paramMap.get('userId'));
      }
    });
    const queryParamsSubscription = this.activatedRoute.queryParams.subscribe({
      next: queryParams => {
        this.order = queryParams['order'];
      }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      queryParamsSubscription.unsubscribe();
    });
  }
}
