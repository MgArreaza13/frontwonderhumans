import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    focus;
    focus1;
    public toggleSidebar = 'show';
    constructor() { }

    ngOnInit() {}

  detectChange($event: any) {
    this.toggleSidebar = $event;
  }

  toggle() {
    switch (this.toggleSidebar) {
      case 'none': this.toggleSidebar = 'show'; break;
      case 'show': this.toggleSidebar = 'none'; break;
      default: this.toggleSidebar = 'show'; break;
    }
  }
}
