import {inject, Injectable} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private ngbModalService: NgbModal = inject(NgbModal);

  displayModal(size: string, modalInstance: any) {
    const modalRef = this.ngbModalService.open(modalInstance, {
      size: size ? size : 'sm',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
  }

  displayModalForm(size: string, modalInstance: any, form?: FormGroup) {

    const modalRef = this.ngbModalService.open(modalInstance, {
      size: size ? size : 'sm',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.result.finally(() => {
      form?.reset();
      form?.enable();
    });
  }
  closeAll() {
    this.ngbModalService.dismissAll();
  }

}
