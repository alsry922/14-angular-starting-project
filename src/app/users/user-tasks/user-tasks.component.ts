import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot
} from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent {
  // @Input({required: true}) userId!: string;
  @Input({required: true}) userName = '';
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
}

export const usernameResolver: ResolveFn<string> =
  (activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot) => {
    const usersService = inject(UsersService);
    const username =
      usersService.users.find(user => user.id === activatedRouteSnapshot.paramMap.get('userId'))?.name ?? '';
    return username;
  }
