import {Component, computed, DestroyRef, inject, input, Input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";

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
export class UserTasksComponent implements OnInit {
  // @Input({required: true}) userId!: string;
  userName = '';
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  // userName = computed(() => this.userService.users.find(user => user.id === this.userId)?.name);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        this.userName =
          this.userService.users.find(user => user.id === paramMap.get('userId'))?.name || ''
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
