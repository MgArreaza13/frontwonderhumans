import { HomelessService } from './../../core/services/homeless.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox } from 'ngx-lightbox';


@Component({
  selector: 'app-homeless-profile',
  templateUrl: './homeless-profile.component.html',
  styleUrls: ['./homeless-profile.component.scss']
})
export class HomelessProfileComponent implements OnInit {
  closeResult: string;
  private idHomeless;
  private homelessProfile;
  name = 'Angular';
  album: any = [];
  constructor(
    private modalService: NgbModal,
    private homelessService: HomelessService,
    private route: ActivatedRoute,
    private _lightbox: Lightbox,
  ) {
    this.idHomeless = this.route.snapshot.paramMap.get('idHomeless');
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
    this.album.push({ 'src': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', 'caption': 'Imag1', 'thumb': 'https://images.unsplash.com/photo-1581501171910-a6394cff12b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' });
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

  openM(index: number): void {
    this._lightbox.open(this.album, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
