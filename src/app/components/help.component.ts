import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wu-help',
  templateUrl: './help.component.html',
  styleUrls: ['/help.component.scss']
})

export class HelpComponent implements OnInit {

  @Input() topic: string;

  constructor (

  ) {}

  ngOnInit () {}

}
