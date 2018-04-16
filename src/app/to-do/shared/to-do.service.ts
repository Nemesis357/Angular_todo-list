import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ToDoService {
  toDoList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {  }

  // Retrieve data from database
  getData() {
    return this.db.list('data');
  }

  //Add list item
  addToDo(input: string) {
    this.toDoList.push({
      title: input,
      isChecked: false
    })
  }

  checkUncheck($key: string, flag: boolean) {
    this.toDoList.update($key, {isChecked: flag})
  }

  removeItem($key: string) {
    this.toDoList.remove($key);
  }

  // Getter for todo list
  getToDoList() {
    this.toDoList = this.db.list('data');
    return this.toDoList;
  }
}
