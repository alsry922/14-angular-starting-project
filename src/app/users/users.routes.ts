import {TasksComponent} from "../tasks/tasks.component";
import {NewTaskComponent} from "../tasks/new-task/new-task.component";
import {Routes} from "@angular/router";

export const usersRoutes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full',
  },
  {
    path: 'tasks', component: TasksComponent
  },
  {
    path: 'tasks/new', component: NewTaskComponent,
  }
];
