import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CupertinoPane} from 'cupertino-pane';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  isScanMode = false;
  cupertinoPane: any;
  keyword: FormControl;
  @Output() keywordEmitter = new EventEmitter<string>();
  constructor() {
    this.keyword = new FormControl();
  }

  ngOnInit(): void {
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', {
      draggableOver: true
    });

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

    this.keyword.valueChanges
      .subscribe((value) => {
        this.keywordEmitter.emit(value);
      });
  }

  setKeyword(keyword: string) {
    this.keyword.setValue(keyword);
  }
  clearSearch(): void {
    this.keyword.setValue('');
  }
}
