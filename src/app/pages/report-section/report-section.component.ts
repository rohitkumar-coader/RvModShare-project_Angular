import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "src/app/shared/shared.service";
import { PagesService } from "../pages.service";

@Component({
  selector: "app-report-section",
  templateUrl: "./report-section.component.html",
  styleUrls: ["./report-section.component.scss"],
})
export class ReportSectionComponent implements OnInit {
  @Input() reportData: any;
  // @Input() id:any;

  public reportForm: FormGroup;
  submitted = false;
  _reportSubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private router: Router,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {
    this.createForm();
  }

  createForm() {
    this.reportForm = this.formBuilder.group({
      type: ["", Validators.required],
      reason: ["", Validators.required],
    });
  }

  get f() {
    return this.reportForm.controls;
  }

  ngOnInit(): void {
    console.log(this.reportData);
    // this.authService.sendTop();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.reportForm.invalid) {
      let data = {
        postId: this.reportData.id,
        reason: this.reportForm.value.reason,
        postType: this.reportData.key,
        type: this.reportForm.value.type,
      };
      if (this.reportData.reportType) {
        data["reportType"] = this.reportData.reportType;
      }

      this.spinner.show();
      this._reportSubscription = this.sharedService
        .post(data, "add/reportpost")
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.reportForm.reset();
              this.submitted = false;
              this.activeModal.close();
              this.toastr.success("Report Posted Successfully");

              // this.router.navigate(['/auth/resetpassword']);
            } else {
              this.toastr.error(res.error.message);
            }
            this.spinner.hide();
          },
          (error) => {
            this.toastr.error(error);
            this.spinner.hide();
          }
        );
    }
  }

  close() {
    this.activeModal.close();
  }
}
