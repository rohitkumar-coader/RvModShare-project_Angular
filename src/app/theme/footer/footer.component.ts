import { Component, OnInit } from "@angular/core";
declare var FB: any;

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  currentUser: any;
  user:any 
  date: number = new Date().getFullYear();
  constructor() {
  }

  ngOnInit() {
  
    
  }
}
