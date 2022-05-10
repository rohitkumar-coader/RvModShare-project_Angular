import { HttpEvent, HttpEventType } from "@angular/common/http";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CredentialsService } from "src/app/auth/credentials.service";
import { BehaviorService } from "src/app/shared/behavior.service";
import { SharedService } from "src/app/shared/shared.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { PagesService } from "../pages.service";
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-rv-interest",
  templateUrl: "./rv-interest.component.html",
  styleUrls: ["./rv-interest.component.scss"],
})
export class RvInterestComponent implements OnInit {
  @Input() public fromWelcomePage: any;
  @Input() name;
  @Input() followModal = false;
  @ViewChild("content", { static: true }) modalContent2: TemplateRef<any>;
  @ViewChild("content0", { static: true }) modalContent: TemplateRef<any>;
  @ViewChild("myInput", { static: false }) myInputVariable: ElementRef<any>;
  imageLoader: boolean = false;
  progress: number = 0;
  closeResult = "";
  isEmpty = true;
  tab = 0;
  subtabs = 0;
  closeBtn: boolean = false;
  modalReference: any;
  selectedRvType: any;
  minDate = new Date();
  token = "";
  timeRanges: any = [];
  isShown: boolean = false;
  user: any;
  categoryId: any;
  fileToUpload: File = null;
  profileImage: string = "";
  public Form: FormGroup;
  year1: any = "";
  year = new Date().getFullYear() + 1;
  userID = "";
  display_name: string = "";
  submitted = false;
  skillLevelNeeded: any = [];
  _host = environment.url;
  _loginObservable: any;
  years = [];
  difficulties: any = [];
  isHarmless = false;
  rvType: string;
  allMakes: Array<any> = [];
  make: string;
  model: string;
  pageContent;
  allModels: Array<any> = [];
  allCategories: Array<any> = [];
  interestArray: any = [];
  rvTypes: Array<any> = [
    {
      description: "Class A",
      detail: { value: "a", key: "Class A" },
    },
    {
      description: "Class B",
      detail: { value: "b", key: "Class B" },
    },
    {
      description: "Class C",
      detail: { value: "c", key: "Class C" },
    },
    {
      description: "Truck Camper",
      detail: { value: "truck-camper", key: "Truck Camper" },
    },
    //  {
    //   description: "Camper Van",
    //   detail: { value: "camper-van", key: "Camper Van" },
    // },
    {
      description: "Travel Trailer",
      detail: { value: "trailer", key: "Travel Trailer" },
    },
    // {
    //   description: "Folding Trailer",
    //   detail: { value: "folding-trailer", key: "Folding Trailer" },
    // },
    {
      description: "Fifth-Wheel",
      detail: { value: "fifth-wheel", key: "Fifth-Wheel" },
    },
    {
      description: "Custom",
      detail: { value: "custom", key: "Custom" },
    },
    {
      description: "Ambulance",
      detail: { value: "ambulance", key: "Ambulance" },
    },
    {
      description: "Skoolie",
      detail: { value: "skoolie", key: "Skoolie" },
    },
    // {
    //   description: "Tow Vehicle",
    //             detail: {value:"tow-vehicle",key:"Tow Vehicle"},
    // },
    // {
    //   description: "Utility Trailer",
    //             detail: {value:"utility-trailer",key:"Utility Trailer"},
    // },
    // {
    //   description: "Other",
    //   detail: { value: "other", key: "Other" },
    // },
    // {
    //   description: "I'm a Wannabe",
    //             detail: {value:"wanna-be",key:"I'm a Wannabe"},
    // }
  ];
  config1 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "RV Class", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search RV Type", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  config2 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Make", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search make", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  config3 = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    // value: 'selectedDatasource',
    search: true, //true/false for the search functionlity defaults to false,
    height: "auto", //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: "Choose Series", // text to be displayed when no item is selected defaults to Select,
    customComparator: () => {}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 100, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: "more", // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search Series", // label thats displayed in search input,
    searchOnKey: "description", // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };

  modCategories = [];
  addedInterest: any = [];

  //updated_by_gi
  modSubmit: any;
  mf: any;
  onSubmit: any;

  constructor(
    private modalService: NgbModal,
    private pageService: PagesService,
    private _bs: BehaviorService,
    config: NgbModalConfig,
    private router: Router,
    private formBuilder: FormBuilder,
    public credentialsService: CredentialsService,
    private _activateRouter: ActivatedRoute,
    // public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    public sharedService: SharedService
  ) {
    this.createForm();
    this.getYears();
    config.backdrop = "static";
    config.keyboard = false;
    this.Form.valueChanges.subscribe((selectedValue) => {
      console.log(selectedValue, "selectedValue");
      this.isEmpty = Object.values(selectedValue).every(
        (o) => o == null || o == ""
      );
      // if (selectedValue.rvType) {
      //   this.Form.controls["make"].reset();
      //   this.Form.controls["model"].reset();
      // }
    });
  }

  ngOnInit() {
    this.getAllTimeRange();
    this.getSkillCategories();
    this.getSize();
    this.userID = this._activateRouter.snapshot.params["id"];

    this._activateRouter.queryParams.subscribe((params) => {
      console.log(params, "params");

      this.pageContent = params.pageContent;
      if (params.followModal) this.closeBtn = true;
    });
    if (this.userID != "" && this.userID != undefined) {
      let data = {
        id: this.userID,
      };
      // this.autoLogin(data);
      // if(!this.pageContent){
      //   this.autoLogin(data);
      // }
      // else{
      //   this.openharmnessModal()
      // }
      this.getALLCategories();
      this.getuserFollowCategory();
    }
    // if(this.pageContent){
    //   this.modalReference=JSON.parse(this.pageContent)
    //   // this.content=this.pageContent
    //   // this.modalReference=localStorage.getItem("modal");
    //   this.modalReference.open()
    // }
    this.getModCategories("modpost");
  }
  //   ngOnChanges(changes: any) {
  //     console.log(changes)
  //     this.open(this.content);
  //  }

  createForm() {
    this.Form = this.formBuilder.group({
      modCategory: [""],
      // modCategory: ['', Validators.required],
      rvType: [""],
      make: [""],
      year: [""],
      model: [""],
      series: [""],
      size: [""],
      difficulty: [""],
      timerange: [""],
      // age: ['', Validators.required],
      // dob:['', Validators.required]
    });
    console.log(this.Form.value, "this.Form.value24423342");
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
  get f() {
    return this.Form.controls;
  }
  getYears() {
    // for(let i = (this.year - 25); i < (this.year + 1); i++) {
    for (let i = this.year; i >= 1970; i--) {
      this.years.push(i);
    }
    // this.years.push("I'm a Wannabe")
  }

  viewHarmnessPage() {
    this.router.navigate(["/harmless-agreement"], {
      queryParams: { id: this.userID, pageContent: "content" },
    });
  }

  // closeModal(sendData: any = "") {
  //   this.getuserFollowCategory();
  //   window.location.reload();
  // }
  closeModal() {
    // this.getuserFollowCategory();
    if (this.followModal) {
      this._bs.reloadFollowCategory.next(true);
    } else {
      this.getuserFollowCategory();
    }
    this.modalService.dismissAll();
  }
  selectedRVType(data) {
    this.selectedRvType = data.value.description;
    this.rvType = data.value.detail.value;
    this.Form.controls["make"].reset();
    this.Form.controls["model"].reset();
    this.allMakes = [];
    this.allModels = [];
    this.getCategories();
  }
  selectedMake(data) {
    this.make = data.value.description;
    this.categoryId = data.value.detail.id ? data.value.detail.id : "";
    this.Form.controls["model"].reset();
    this.allModels = [];
    this.getSubCategories();
  }
  selectedModel(data) {
    this.model = data.value.detail.name;
  }
  // openharmnessModal(){
  // this.open(this.modalContent2)
  // }
  getSkillCategories() {
    let data = {
      type: "categories",
      cat_type: "difficulty",
      status: "active",
    };
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          // if (type == "modpost") {
          //   this.modCategories = res.data;
          // }

          // if(type=='skills'){
          this.skillLevelNeeded = res.data;
          // }
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
  }
  getSize() {
    let data = {
      type: "categories",
      cat_type: "size",
      status: "active",
    };
    this.pageService.getCategories(data).subscribe(
      (res: any) => {
        if (res.success) {
          // if (type == "modpost") {
          //   this.modCategories = res.data;
          // }

          // if(type=='skills'){
          this.difficulties = res.data;
          // }
          // this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        // this.spinner.hide();
      },
      (err) => {
        // this.spinner.hide();
      }
    );
  }
  getAllTimeRange() {
    this.pageService.getTimeRanges().subscribe(
      (response) => {
        if (response.success) {
          this.timeRanges = response.data;
          // console.log(this.allMakes, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }
  onSubmitted() {
    this.submitted = true;
    let interestArray = {
      interestArray: [this.sharedService.clean(this.interestArray[0])],
    };
    // if (!this.Form.invalid) {
    //   console.log("in if");
    //   let data=this.Form.value
    //   data['make']=this.make
    //   data['model']=this.model
    //   data['rvType']= this.selectedRvType
    //   // data['id']=this.userID
    this.pageService.addFollowCategories(interestArray).subscribe(
      (res: any) => {
        if (res.success) {
          this.submitted = false;
          this.Form.reset();
          this.allModels = [];
          this.allMakes = [];
          this.rvType = "";
          this.getuserFollowCategory();
          this.Form.setValue({
            year: "",
            modCategory: "",
            rvType: "",
            make: "",
            model: "",
            series: "",
            size: "",
            difficulty: "",
            timerange: "",
          });

          // this.Form.value.year=''
          // this.Form.value.modCategory=''
          console.log(this.Form.value, "this.Form.jmnbggf");
          this._bs.contenModalValid.next(true);
          // this.categories=res.data
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.toastr.error(err, "Error");
        this.spinner.hide();
      }
    );
    // }
  }

  selectAll(ele) {
    //   checkboxes = document.getElementsByName('foo');
    // for(var i=0, n=checkboxes.length;i<n;i++) {
    //   checkboxes[i].checked = source.checked;
    // }
    // var checkboxes = document.getElementsByTagName('input');
    // if (ele.checked) {
    //     for (var i = 0; i < checkboxes.length; i++) {
    //         if (checkboxes[i].type == 'checkbox') {
    //             checkboxes[i].checked = true;
    //             this.allCategories.forEach(x=>{
    //               this.followCategories.push(x.id);
    //             })
    //         }
    //     }
    // } else {
    //     for (var i = 0; i < checkboxes.length; i++) {
    //         console.log(i)
    //         if (checkboxes[i].type == 'checkbox') {
    //             checkboxes[i].checked = false;
    //             this.followCategories = [];
    //         }
    //     }
    // }
  }

  pushCategory() {
    console.log(this.Form.value, "this.Form.value.rvType");
    this.submitted = true;
    if (!this.Form.invalid) {
      let formData = {
        categoryId: this.Form.value.modCategory,
        categoryType: "modpost",
        rvClass: this.rvType ? this.rvType : null,
        // 'rvClass': this.Form.value.rvType.description,
        rvMake: this.Form.value.make.id,
        rvSeries: this.Form.value.model.id,
        rvModel: this.Form.value.series,
        rvYear: this.Form.value.year,
        size: this.Form.value.size,
        difficulty: this.Form.value.difficulty,
        timerange: this.Form.value.timerange,
      };
      // added by sheetal
      this.isEmpty = Object.values(formData).every((o) => o == null || o == "");
      if (this.isEmpty) {
        return;
      } else {
        this.interestArray = [];

        this.interestArray.push(formData);
        this.onSubmitted();
      }

      // this.getuserFollowCategory();
    }

    // if(e.target.checked){
    //   this.followCategories.push(e.target.value);
    // }else{
    //   this.removeElement(this.followCategories,this.followCategories.find(x=>x == e.target.value));
    // }
  }

  removeIntrest(id) {
    let object = {
      id: id,
    };
    this.pageService.removeInterest(object).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success(res.message, "Success");
          this.getuserFollowCategory();
          this.spinner.hide();
        } else {
          this.toastr.error(res.error.message, "Error");
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
    // this.removeElement(this.interestArray,i);
  }

  // selectAll(e){
  //   if(e.target.checked){

  //   }else{
  //     this.followCategories = [];
  //     // this.removeElement(this.followCategories,this.followCategories.find(x=>x == e.target.value));
  //   }
  // }

  removeElement(array, elem) {
    // console.log(array,elem);
    // console.log(array.findIndex(elem));
    // var index = array.findIndex(elem);
    if (elem > -1) {
      array.splice(elem, 1);
    }
  }

  getuserFollowCategory() {
    this.sharedService.get("user/categoryfollow").subscribe(
      (res: any) => {
        if (res.success) {
          this.addedInterest = res.data;
          // console.log(  this.modCategories, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getModCategories(type) {
    // this.spinner.show();
    let filters = {
      type: type,
      count: 1000,
      sortBy: "name asc",
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.modCategories = response.data;
          // console.log(  this.modCategories, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getModSize(type) {
    // this.spinner.show();
    let filters = {
      type: type,
      count: 1000,
      sortBy: "name asc",
    };
    if (type != "size") {
      filters["sortBy"] = "name asc";
    }
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.difficulties = response.data;
          // console.log(  this.modCategories, "this.allMakes");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getALLCategories() {
    // this.spinner.show();
    // let filters = {
    //   type: '',
    // };
    this.pageService.getMainsCategories().subscribe(
      (response) => {
        if (response.success) {
          this.allCategories = response.data;
          console.log(this.allCategories, "this.allCategories..");
          // this.spinner.hide();
        } else {
          // this.spinner.hide();
        }
      },
      (error) => {
        // this.spinner.hide();
      }
    );
  }

  getCategories() {
    this.spinner.show();
    let filters = {
      type: this.rvType,
      count: 1000,
      sortBy: -1,
    };
    this.pageService.getMainCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          let makesData = [];
          response.data.forEach((element) => {
            makesData.push({
              id: element["id"],
              description: element["name"],
              detail: element,
              // id: element['parentCategory']['id'],
              // description: element['parentCategory']['name'],
              // detail: element,
            });
          });
          const map = new Map();
          this.allMakes = [];
          for (const item of makesData) {
            if (!map.has(item.id)) {
              map.set(item.id, true); // set any value to Map
              this.allMakes.push({
                id: item.id,
                description: item.description,
                detail: item.detail,
              });
            }
          }
          // this.allMakes.push({
          //   id: null,
          //   description: "I'm a Wannabe"
          // });
          this.allMakes = [...this.allMakes];

          console.log(this.allMakes, "this.allMakes");
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  getSubCategories() {
    this.spinner.show();
    let filters = {
      type: this.rvType,
      categoryId: this.categoryId,
      count: 1000,
      sortBy: -1,
    };
    this.pageService.getSubCategories(filters).subscribe(
      (response) => {
        if (response.success) {
          this.allModels = [];
          response.data.forEach((element) => {
            this.allModels.push({
              id: element["id"],
              description: element["name"],
              detail: element,
            });
          });
          // this.allModels.push({
          //   id: null,
          //   description: "I'm a Wannabe"
          // });
          this.allModels = [...this.allModels];

          console.log(this.allModels, "this.allModels");
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy(): void {
    // this.close()
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
