import { Component, OnInit, HostListener } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CredentialsService } from "src/app/auth/credentials.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  public showFooter: boolean = false;
  hideSidebar = true;
  hideHeader = false;
  tooglebutton: any;
  
  // public isLoggedIn: boolean = false;
  user: any;
  currentUser: any;
  user1: any;
  constructor(
    private _router: Router,
    public credentialsService: CredentialsService
  ) {
    this.user1 = this.credentialsService.credentials
      console.log(this.user1,"this.user1")
    this.currentUser = JSON.parse(localStorage.getItem("credentials"));
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if( evt.url.indexOf('welcome') >=0 ){
        this.showFooter = false;       
        // localStorage.removeItem('search');
                
    } else {
            this.showFooter = true;                               
    }
      if (
        evt.url.indexOf("/groups") >= 0 ||
        // evt.url.indexOf("/market-place-details") >= 0 ||
        // evt.url.indexOf("/modstores") >= 0 ||
        // evt.url.indexOf("/marketplace") >= 0 ||
        // evt.url.indexOf("/search-category") >= 0 ||
        // evt.url.indexOf("/modmarket") >= 0 ||
        // evt.url.indexOf("/manage-group") >= 0 ||
        evt.url.indexOf("/dashboard") >= 0 ||
        evt.url.indexOf("/auth") >= 0
      ) {
        this.hideSidebar = false;
      } else {
        this.hideSidebar = true;
      }
      if (
        evt.url.indexOf("/welcome") >= 0 ||
        evt.url.indexOf("/harmless-agreement") >= 0
      ) {
        this.hideHeader = true;
      } else {
        this.hideHeader = false;
      }
    });
  }

  ngOnInit(): void {
    console.log("its called");
    this.user = this.credentialsService.credentials
      ? this.credentialsService.credentials
      : "";
      
  }

  layout(key) {
    this.tooglebutton = key;
  }
}
