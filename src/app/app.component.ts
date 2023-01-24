import {Component, OnInit} from '@angular/core';
import {CupertinoPane} from 'cupertino-pane';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'canteen-jdl';

  ngOnInit(): void {
    let myPane = new CupertinoPane('.cupertino-pane', {
      draggableOver: true,
      backdrop: true
    });

    myPane.enableDrag();
    console.log(myPane.modules);

    myPane.present({
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
