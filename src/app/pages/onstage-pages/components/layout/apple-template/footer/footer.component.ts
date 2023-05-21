import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer [RandomColor]',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() RandomColor: string;

  NowDate = new Date();
  StudioName = "66 IT Studio";

  constructor() { }

  ngOnInit(): void {
  }

}
