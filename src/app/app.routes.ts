import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {usernameResolver, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {usersRoutes} from "./users/users.routes";

const dummyCanMath: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {path: '', component: NoTaskComponent},
  // {path: '', redirectTo: '/users/u1', pathMatch: 'full'},
  {
    path: 'users/:userId', component: UserTasksComponent,
    children: usersRoutes,
    // canMatch: [dummyCanMath],
    resolve: {
      userName: usernameResolver,
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
