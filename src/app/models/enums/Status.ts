// Active - A task that has more than 12h remaining and is not completed 
// Urgent - A task that is not completed and has less than 12h to be completed 
// Overdue -  A task that is past its due date
// Completed - A completed task

export enum Status {
    Active = "Active",
    Urgent = "Urgent",
    Overdue = "Overdue",
    Completed = "Completed"
}

