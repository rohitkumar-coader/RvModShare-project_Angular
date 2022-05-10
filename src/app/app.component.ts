import { isPlatformBrowser } from "@angular/common";
import { Component, HostListener, Inject, PLATFORM_ID } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router"; // import Router and NavigationEnd
import { filter } from "rxjs/operators";
declare const gtag: Function;

// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "vanmodsy-frontend";
  ChatStatus = "";

  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // ga('set', 'page', event.urlAfterRedirects);
        // ga('send', 'pageview');
      }
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        /** START : Code to Track Page View  */
        if (isPlatformBrowser(this.platformId)) {
          gtag("event", "page_view", {
            page_path: event.urlAfterRedirects,
          });
        }
      });
  }
  //start Rohit for online offline status start
  // @HostListener('window:focus', [''])
  // onFocused() {
  //   this.ChatStatus = 'online';
  //   localStorage.setItem('Status', this.ChatStatus);
  //   console.log(this.ChatStatus)
  // }
  // @HostListener('window:blur', [''])
  // onBlur() {
  //   this.ChatStatus = 'Offline';
  //   localStorage.setItem('Status', this.ChatStatus);
  //   console.log(this.ChatStatus)
  // }
  // @HostListener('window:offline')
  // setNetworkOffline(): void {
  //   this.ChatStatus = 'Offline';
  //   localStorage.setItem('Status', this.ChatStatus);
  //   console.log(this.ChatStatus)
  // }

  // @HostListener('window:online')
  // setNetworkOnline(): void {
  //   this.ChatStatus = 'online';
  //   localStorage.setItem('Status', this.ChatStatus);
  //   console.log(this.ChatStatus)
  // }
  //start Rohit for online offline status end
}
