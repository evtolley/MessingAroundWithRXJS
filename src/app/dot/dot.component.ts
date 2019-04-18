import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class DotComponent implements OnInit {

  constructor() { }

  marginTop = 0;
  marginTop$ = new BehaviorSubject<string>('0px');
  goingDown: boolean;

  move(margin: number) {
    if(this.goingDown) {
      this.marginTop += margin;
    } else {
      this.marginTop -= margin;
    }

    if(this.marginTop >= 500) {
      this.goingDown = false;
    } else if (this.marginTop <= 0) {
      this.goingDown = true;
    }
    this.marginTop$.next(`${this.marginTop}px`);
  }

  ngOnInit() {
  }

}
