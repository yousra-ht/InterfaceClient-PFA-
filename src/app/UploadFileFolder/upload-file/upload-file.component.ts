import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../service/upload-file.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  tpdata: any;
  constructor(private Uploadfileservice: UploadFileService, private uploadFileService: UploadFileService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.fileInfos = this.Uploadfileservice.getFiles();
    const id = this.route.snapshot.paramMap.get("dynamicParameter");
    this.uploadFileService.getTp(id).then((resp) => {
      this.tpdata = resp.data, console.log(this.tpdata)
    })
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.Uploadfileservice.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.Uploadfileservice.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Impossible de télécharger le fichier!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
}
