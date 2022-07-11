import { Injectable } from '@angular/core';
import { Status } from '../models/enums/Status';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public getStatus(taskDueDate: string, isCompleted: boolean): Status {
    var duration: moment.Duration = moment.duration(moment(taskDueDate).diff(moment()));
    var hours: number = duration.asHours();

    if (isCompleted) {
      return Status.Completed;
    }
    else if (hours >= 12 && !isCompleted) {
      return Status.Active;
    }
    else if (hours > 0 && hours < 12 && !isCompleted) {
      return Status.Urgent;
    }
    else {
      return Status.Overdue;
    }
  }

  public getStatusCss(status: Status): string {
    let result: string = "";
    switch (status) {
      case Status.Completed: result = "green"; break;
      case Status.Active: result = "blue"; break;
      case Status.Urgent: result = "orange"; break;
      default: result = "red"; break;
    }
    return result;
  }

}