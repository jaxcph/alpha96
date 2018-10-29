import { Component,  EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent  {
  @Output() onChanged: EventEmitter<any> = new EventEmitter();
 

  constructor() { }

  onSearch(model: string){
         
   

  
    this.onChanged.emit(model);
}




}
