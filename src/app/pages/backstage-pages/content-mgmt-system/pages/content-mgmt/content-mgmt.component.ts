import { Component, OnInit } from '@angular/core';
import { EnumComponentType } from 'src/app/shared/enum/enum-component-type';

@Component({
  selector: 'app-content-mgmt',
  templateUrl: './content-mgmt.component.html',
  styleUrls: ['./content-mgmt.component.css']
})
export class ContentMgmtComponent implements OnInit {

  _EnumComponentType = EnumComponentType;

  constructor() { }

  ngOnInit(): void {
  }

}
