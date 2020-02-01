import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-homeless-profile',
  templateUrl: './homeless-profile.component.html',
  styleUrls: ['./homeless-profile.component.scss']
})
export class HomelessProfileComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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
}
