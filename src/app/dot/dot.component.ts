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

  marginRight = 0;
  marginRight$ = new BehaviorSubject<string>('0px');

  goingDown: boolean;
  goingRight = false;

  moveVertically(margin: number) {
    if (this.goingDown) {
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

  moveHorizontally(margin: number) {
    if (this.goingRight) {
      this.marginRight -= margin;
    } else {
      this.marginRight += margin;
    }

    if (this.marginRight >= 200) {
      this.goingRight = true;
    } else if (this.marginRight <= 0) {
      this.goingRight = false;
    }
    this.marginRight$.next(`${this.marginRight}px`);
  }


  ngOnInit() {
  }

}
