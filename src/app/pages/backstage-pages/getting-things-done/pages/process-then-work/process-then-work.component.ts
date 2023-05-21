import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/backstage-pages/components/base/base.component';

@Component({
  selector: 'app-process-then-work',
  templateUrl: './process-then-work.component.html',
  styleUrls: ['./process-then-work.component.css']
})
export class ProcessThenWorkComponent extends BaseComponent implements OnInit {

  number: number[];

  constructor() {

    super();

    this.number = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
  }

}

