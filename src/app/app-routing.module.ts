import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './features/todo-form/todo-form.component';
import { TodoListComponent } from './features/todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TodoListComponent, pathMatch: 'full' },
      { path: 'form', component: TodoFormComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
