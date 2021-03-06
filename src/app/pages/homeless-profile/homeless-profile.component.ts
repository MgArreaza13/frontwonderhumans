import { HomelessService } from './../../core/services/homeless.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox } from 'ngx-lightbox';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent, Element as StripeElement, ElementOptions, ElementsOptions } from "@nomadreservations/ngx-stripe";


@Component({
  selector: 'app-homeless-profile',
  templateUrl: './homeless-profile.component.html',
  styleUrls: ['./homeless-profile.component.scss']
})
export class HomelessProfileComponent implements OnInit {
  stripeKey = '';
  error: any;
  complete = false;
  element: StripeElement;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: 'red',
        color: 'gray',
        lineHeight: '40px',
        fontWeight: 500,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  modalRef: BsModalRef;
  portfolio: any;
  eventsList: any;
  donationsList: any;
  closeResult: string;
  comment;
  ifSendComment = false;
  private idHomeless;
  private homelessProfile;
  name;
  total;
  description;
  album: any = [];
  comments;
  constructor(
    private modalService: NgbModal,
    private homelessService: HomelessService,
    private route: ActivatedRoute,
    private _lightbox: Lightbox,
    private bmodalService: BsModalService,
    private _stripe: StripeService
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

  cardUpdated(result) {
    this.element = result.element;
    this.complete = result.card.complete;
    this.error = undefined;
  }

  keyUpdated() {
    this._stripe.changeKey(this.stripeKey);
  }

  getCardToken() {
    this._stripe.createToken(this.element, {
      name: 'tested_ca',
      address_line1: '123 A Place',
      address_line2: 'Suite 100',
      address_city: 'Irving',
      address_state: 'BC',
      address_zip: 'VOE 1H0',
      address_country: 'CA'
    }).subscribe(result => {
      // Pass token to service for purchase.
      console.log(result);
    });
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
      (data) => {
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
      (data: any) => {
        this.donationsList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getEventList(id) {
    this.homelessService.getEventsDonations(id).subscribe(
      (data: any) => {
        this.eventsList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getPortfolioList(id) {
    this.homelessService.getPortfolio(id).subscribe(
      (data: any) => {
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

  newComment() {
    this.createComment(this.idHomeless);
  }

  createComment(id) {
    const body = {
      comment: this.comment
    }
    this.ifSendComment = true;

    this.homelessService.newComment(id, body).subscribe(
      (data: any) => {
        console.log(data);
        this.ifSendComment = false;
        this.comment = '';
        this.comments = data;
      },
      error => {
        this.ifSendComment = false;
        console.log(error);
      }
    )

  }

  newEvent() {
    this.createEvent(this.idHomeless);
  }

  createEvent(id) {
    const body = {
      name: this.name,
      total: this.total,
      description: this.description,
    };
    console.log(body);
    this.homelessService.newEvent(id, body).subscribe(
      (data: any) => {
        console.log(data);
        this.closemodal();


      },
      error => {
        console.log(error);
      }
    )
  }

  closemodal() {
    this.modalRef.hide();
  }
}
