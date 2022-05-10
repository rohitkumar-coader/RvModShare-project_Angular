import { Component, OnInit } from '@angular/core';
import { BehaviorService } from 'src/app/shared/behavior.service';

@Component({
  selector: 'app-customize-feed',
  templateUrl: './customize-feed.component.html',
  styleUrls: ['./customize-feed.component.scss']
})
export class CustomizeFeedComponent implements OnInit {

  constructor(
    public _bs:BehaviorService
  ) { }

  ngOnInit() {
  }

  goToConnectionPage() {
      this._bs.postDataToreload.next({
                  tabToview: 'pills-mod-contact-tab',
                });
  }
}
