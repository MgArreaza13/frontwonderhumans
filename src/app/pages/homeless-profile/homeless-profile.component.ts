import { HomelessService } from './../../core/services/homeless.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox } from 'ngx-lightbox';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-homeless-profile',
  templateUrl: './homeless-profile.component.html',
  styleUrls: ['./homeless-profile.component.scss']
})
export class HomelessProfileComponent implements OnInit {
  modalRef: BsModalRef;
  portfolio: any;
  eventsList: any;
  donationsList: any;
  closeResult: string;
  private idHomeless;
  private homelessProfile;
  name = 'Angular';
  album: any = [];
  comments;
  constructor(
    private modalService: NgbModal,
    private homelessService: HomelessService,
    private route: ActivatedRoute,
    private _lightbox: Lightbox,
    private bmodalService: BsModalService
  ) {
    this.idHomeless = this.route.snapshot.paramMap.get('idHomeless');
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
  }

  ngOnInit() {
    this.getProfile(this.idHomeless);
    this.getCommentsProfile(this.idHomeless);
    this.getDonationsList(this.idHomeless);
    this.getEventList(this.idHomeless);
    this.getPortfolioList(this.idHomeless);
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


  getCommentsProfile(id: number) {
    this.homelessService.getCommentsProfile(id).subscribe(
      (data)=>{
        console.log(data);
        this.comments = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  openM(url): void {
    // this._lightbox.open(`http://localhost:8000${url}`);
  }

  close(): void {
    this._lightbox.close();
  }



  getDonationsList(id) {
    this.homelessService.getDonations(id).subscribe(
      (data:any) => {
        this.donationsList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getEventList(id) {
    this.homelessService.getEventsDonations(id).subscribe(
      (data:any) => {
        this.eventsList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getPortfolioList(id) {
    this.homelessService.getPortfolio(id).subscribe(
      (data:any) => {
        this.portfolio = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bmodalService.show(template);
  }
}
