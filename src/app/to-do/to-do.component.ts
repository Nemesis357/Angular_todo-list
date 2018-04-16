import { Component, OnInit } from '@angular/core';
import { ToDoService } from './shared/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  toDoList: any[];
  isEmpty: boolean = false;
  errorMessage: string = "Input field is empty...";
  constructor(private todoService: ToDoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges().subscribe((data) => {
      this.toDoList = []; 
      data.forEach(item => {
        let x = item.payload.toJSON();
        x['$key'] = item.key;
        this.toDoList.push(x);   
      })
      this.toDoList.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    })
  }

  onSubmit(item) {
    if(item.value === '') this.isEmpty = !this.isEmpty;
    else this.isEmpty = false
    this.todoService.addToDo(item.value);
    item.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.todoService.checkUncheck($key,!isChecked);
  }

  onDelete($key : string){
    this.todoService.removeItem($key);
  }
}
