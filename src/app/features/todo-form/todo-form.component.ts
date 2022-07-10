import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITodoDTO } from 'src/app/models/ITodoDto';
import { TodoService } from 'src/app/services/todo.service';
declare var M: any;

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  public todoForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]),
    dueIn: new FormControl(1, [
      Validators.required,
      Validators.min(1)])
  });

  constructor(private todoService: TodoService, private router: Router) { }

  public onSubmit() {
    if (this.todoForm.invalid) {
      M.toast({ html: "The form is not valid." });
      return;
    }
    this.todoService.createTodo(this.todoForm.value as ITodoDTO).subscribe(() => {
      M.toast({ html: "Successfully created Task." });
      this.router.navigate(["/"]);
    });
  }
}
