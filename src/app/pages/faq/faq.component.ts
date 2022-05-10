import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorService } from 'src/app/shared/behavior.service';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqData:Array<any>=[]
  collection = [];
  totalItems=0
  page = 1;
  isDeleted = false
  p:any;
  filters: { page: number; search: string,count:number, isDeleted: boolean } = { page: 1, search: '', count:1000,isDeleted: false };
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _activateRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public _bs: BehaviorService,
    public pageService: PagesService,
    config: NgbCarouselConfig,
    private formBuilder: FormBuilder,
  ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }

  ngOnInit() {
    this.getFaqs()
  }


  getFaqs() {
    this.spinner.show();
    // if (isDeleted) {
    //   this.isDeleted = isDeleted
    //   Object.assign(this.filters, { isDeleted: isDeleted });
    // }
    this.pageService.getAllFaqs(this.filters).subscribe((response) => {
      if (response.data.length == 0) {
        this.faqData = [];
      } else {
        this.totalItems = response.total
        this.faqData = response.data.map(cat => {
          return {
            id: cat.id,
            question: cat.question,
            answer: cat.answer,
            status: cat.status,
            createdAt: cat.createdAt
          }
        });
      } 
      this.spinner.hide();
    });
  }
}
