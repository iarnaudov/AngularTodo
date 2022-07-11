export class CommonFunctions {
    public static sortByDateDescending(a: any, b: any): number {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? -1 : 1;
    }
}