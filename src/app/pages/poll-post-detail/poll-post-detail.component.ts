import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-post-detail',
  templateUrl: './poll-post-detail.component.html',
  styleUrls: ['./poll-post-detail.component.css']
})
export class PollPostDetailComponent implements OnInit {
  postDetail:any
  constructor() { }

  ngOnInit() {
  }
  openLikeModal(content){

  }
  openshare(){

  }
  addLike(to_user_id) {
  }

  addComment(commentId: any,to_user_id) {
  }

  getComments() {
  }

  replyComment(commentId: any, replyon: any,to_user_id) {
  }
  OpenListingOfSharedUsers(item:any){
  }
  readmoreLess() {
  }
}
