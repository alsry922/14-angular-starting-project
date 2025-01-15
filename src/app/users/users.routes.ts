import {orderResolver, TasksComponent, userTasksResolver} from "../tasks/tasks.component";
import {canLeaveEditPageGuard, NewTaskComponent} from "../tasks/new-task/new-task.component";
import {Routes} from "@angular/router";

export const usersRoutes: Routes = [
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: userTasksResolver,
      order: orderResolver,
    }
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPageGuard],
  }
];
