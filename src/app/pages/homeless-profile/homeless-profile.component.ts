import { HomelessService } from './../../core/services/homeless.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-homeless-profile',
  templateUrl: './homeless-profile.component.html',
  styleUrls: ['./homeless-profile.component.scss']
})
export class HomelessProfileComponent implements OnInit {
  closeResult: string;
  private idHomeless;
  private homelessProfile;
  constructor(
    private modalService: NgbModal,
    private homelessService: HomelessService,
    private route: ActivatedRoute
    ) {
    this.idHomeless = this.route.snapshot.paramMap.get('idHomeless');
   }

  ngOnInit() {
    this.getProfile(this.idHomeless);
  }

  open(classic) {
    this.modalService.open(classic, { size: 'lg', centered: true });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getProfile(id: number) {
    this.homelessService.getHomelessProfile(id).subscribe(
      (data) => {
        console.log(data);
        this.homelessProfile = data;
      },
      error => {
        console.log(error)
      }
    )
  }
}
