import { Component, OnInit } from '@angular/core';
import {CupertinoPane} from 'cupertino-pane';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  isScanMode = false;
  cupertinoPane: any;
  constructor() { }

  ngOnInit(): void {
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', {
      draggableOver: true
    });

    this.cupertinoPane.enableDrag();

    this.cupertinoPane.present({
      animate: true,
      transition: {
        duration: 600,
        from: {
          opacity: 0.7,
          transform: `translateY(280px) perspective(250px) rotateX(65deg) scale(0.3)`
        },
        to: {
          opacity: 1
        }
      }
    });
  }

}
