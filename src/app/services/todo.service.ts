import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ITodo } from '../models/ITodo';
import { ITodoDTO } from '../models/ITodoDto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string = "https://auto.loanvantage360.com/fps/api";
  private todosSubject: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  public todosObservable: Observable<ITodo[]> = this.todosSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<ITodo[]> {
    const headers = { userFriendlyMessage: "Todo lists could not be retrieved." };
    return this.http.get<ITodo[]>(`${this.baseUrl}/todo`, { headers }).pipe(map((val: any) => val.data));
  }

  public createTodo(todo: ITodoDTO) {
    const headers = { userFriendlyMessage: "Todo failed to be created." };
    return this.http.post<ITodoDTO>(`${this.baseUrl}/todo`, todo, { headers });
  }

  public updateTodo(todo: ITodo) {
    const headers = { userFriendlyMessage: "Todo failed to be completed." };
    return this.http.put<ITodo>(`${this.baseUrl}/todo`, todo, { headers });
  }

  public deleteTodo(id: number) {
    const headers = { userFriendlyMessage: "Todo failed to be deleted." };
    return this.http.delete(`${this.baseUrl}/todo/${id}`, { headers });
  }

}