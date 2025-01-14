import {Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {usersRoutes} from "./users/users.routes";

export const routes: Routes = [
  {path: '', component: NoTaskComponent},
  // {path: '', redirectTo: '/users/u1', pathMatch: 'full'},
  {
    path: 'users/:userId', component: UserTasksComponent,
    children: usersRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
