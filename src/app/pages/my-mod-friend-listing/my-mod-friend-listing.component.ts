import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { environment } from "src/environments/environment";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-my-mod-friend-listing",
  templateUrl: "./my-mod-friend-listing.component.html",
  styleUrls: ["./my-mod-friend-listing.component.css"],
})
export class MyModFriendListingComponent implements OnInit {
  firendsList: any = [];
  _host = environment.url;

  constructor(
    public credentials: CredentialsService,
    private pageService: PagesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFriendsList();
  }

  getFriendsList() {
    let filters = {
      userid: this.credentials.credentials.id,
    };
    this.pageService.getFriendsList(filters).subscribe(
      (response) => {
        console.log("res...", response);
        if (response.success) {
          this.firendsList = response.data;
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        this.toastr.error(error);
        // this.spinner.hide();
      }
    );
  }

  route(value) {
    this.router.navigate(["friend-profile"], { queryParams: { id: value } });
  }
}
