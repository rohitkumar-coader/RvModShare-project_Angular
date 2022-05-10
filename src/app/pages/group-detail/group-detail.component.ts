import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  modDetail: any;
  openLikeModal : any;
  addLike : any;
  readmoreLess: any;
  getComments: any;
  openshare: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
