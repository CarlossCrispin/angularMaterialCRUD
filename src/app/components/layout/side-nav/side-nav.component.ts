import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  opened: boolean ;
  constructor() { }

  title = 'Material';

  ngOnInit(): void {
    this.opened = false;
  }

  openedIn(){
    this.opened = !this.opened;
  }
}
