import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonFunctions } from '../common/helpers/common-operations.helper';
import { ITodo } from '../models/ITodo';
import { ITodoDTO } from '../models/ITodoDto';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl: string = "https://auto.loanvantage360.com/fps/api";

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<ITodo[]> {
    const headers = { userFriendlyMessage: "Todo lists could not be retrieved." };
    return this.http.get<ITodo[]>(`${this.baseUrl}/todo`, { headers }).pipe(map((val: any) => val.data.sort(CommonFunctions.sortByDateDescending)));
  }

  public createTodo(todo: ITodoDTO): Observable<ITodoDTO> {
    const headers = { userFriendlyMessage: "Todo failed to be created." };
    return this.http.post<ITodoDTO>(`${this.baseUrl}/todo`, todo, { headers });
  }

  public updateTodo(todo: ITodo): Observable<ITodo>  {
    const headers = { userFriendlyMessage: "Todo failed to be completed." };
    return this.http.put<ITodo>(`${this.baseUrl}/todo`, todo, { headers });
  }

  public deleteTodo(id: number): Observable<any> {
    const headers = { userFriendlyMessage: "Todo failed to be deleted." };
    return this.http.delete(`${this.baseUrl}/todo/${id}`, { headers });
  }
}