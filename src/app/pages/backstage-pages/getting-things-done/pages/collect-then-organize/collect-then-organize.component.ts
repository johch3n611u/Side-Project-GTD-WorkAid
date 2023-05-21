import { Component, OnInit } from '@angular/core';
import { EnumComponentType } from '../../../../../shared/enum/enum-component-type';

@Component({
  selector: 'app-collect-then-organize',
  templateUrl: './collect-then-organize.component.html',
  styleUrls: ['./collect-then-organize.component.css']
})
export class CollectThenOrganizeComponent implements OnInit {

  _EnumComponentType = EnumComponentType;

  constructor() { }

  ngOnInit(): void {
  }

}
