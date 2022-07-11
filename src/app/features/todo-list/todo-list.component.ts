import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Status } from 'src/app/models/enums/Status';
import { ITodo } from 'src/app/models/ITodo';
import { ITodoViewModel } from 'src/app/models/viewmodel/ITodoViewModel';
import { StatusService } from 'src/app/services/status.service';
import { TodoService } from 'src/app/services/todo.service';
declare var M: any;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public todos: ITodoViewModel[] = [];
  public subscription: Subscription = new Subscription();

  constructor(
    private todoService: TodoService,
    private statusService: StatusService) { }

  public ngOnInit(): void {
    this.getTodos();
  }

  public deleteTodo(todo: ITodoViewModel): void {
    // "A task that is not yet completed and not past the due date should be able to be deleted."
    if (todo.status == Status.Completed || todo.status == Status.Overdue) {
      M.toast({ html: "You cannot delete this task. It is either completed or overdue!" });
      return;
    }
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      M.toast({ html: "Successfully deleted Task." });
      this.getTodos();
    });
  }

  public completeTodo(todo: ITodoViewModel): void {
    if (todo.status == Status.Overdue) {
      M.toast({ html: "Overdue task cannot be completed" });
      return;
    }

    todo.isDone = !todo.isDone;
    this.todoService.updateTodo(todo).subscribe(() => {
      M.toast({ html: "Successfully completed Task." });
      this.getTodos();
    });
  }

  private getTodos(): void {
    this.subscription.unsubscribe();
    this.subscription = this.todoService.getTodos().subscribe((todos: ITodo[]) => {
      this.todos = todos.map((t: ITodo) => {
        const status: Status = this.statusService.getStatus(t.dueDate, t.isDone);
        return {
          id: t.id,
          name: t.name,
          description: t.description,
          dueDate: new Date(t.dueDate).toLocaleDateString() + " " + new Date(t.dueDate).toLocaleTimeString(),
          isDone: t.isDone,
          status,
          statusCss: this.statusService.getStatusCss(status)
        }
      });
      console.log(this.todos);
    });
  }
}
