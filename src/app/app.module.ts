import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './features/todo-form/todo-form.component';
import { TodoListComponent } from './features/todo-list/todo-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './common/interceptors/auth.interceptor';
import { HttpErrorHandlerInterceptor } from './common/interceptors/http-error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [    
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorHandlerInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
