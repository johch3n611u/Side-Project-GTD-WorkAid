import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-text',
  templateUrl: './goal-text.component.html',
  styleUrls: ['./goal-text.component.css']
})
export class GoalTextComponent implements OnInit {

  DisplayMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
