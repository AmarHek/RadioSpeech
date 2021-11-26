import { Component, OnInit } from "@angular/core";
import {environment} from "@env/environment";
import {Material} from "@app/models";
import {BackendCallerService} from "@app/core";
import {Router} from "@angular/router";

@Component({
  selector: "app-radiolearn",
  templateUrl: "./radiolearn.component.html",
  styleUrls: ["./radiolearn.component.scss"]
})
export class RadiolearnComponent implements OnInit {

  imageUrl = environment.backend + "images/";
  materials: Material[] = [];

  collectionSize = 0;
  pageSize = 10;
  page = 1;

  pathology = "";


  constructor(private backendCaller: BackendCallerService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData().then();
  }

  getData() {
    console.log(this.page, this.pageSize);
    this.backendCaller.listByJudged(true, (this.page - 1) * this.pageSize, this.pageSize)
      .subscribe(res => {
        this.materials = res.materials.reverse();
      }, err => {
        window.alert(err.message);
      });
  }

  getLength() {
    this.backendCaller.getDocCount(true, this.pathology).subscribe(res => {
      console.log("Count: ", res.count);
      this.collectionSize = res.count;
    }, err => {
      console.log(err);
      window.alert(err.message);
    });
  }

  async loadData() {
    await this.getLength();
    this.getData();
  }

  openEditor(matID: string) {
    this.router.navigate(["/", "radiolearn", matID]).then();
  }

  loadRandom() {
    this.backendCaller.getRandomByPathology(this.pathology).subscribe(res => {
      this.openEditor(res.material._id);
    }, err => {
      window.alert(err.message);
    });
  }

}
