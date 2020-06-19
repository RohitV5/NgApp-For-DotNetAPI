import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  baseUrl = environment.baseUrl;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {

    this.hasBaseDropZoneOver = false;

    this.response = '';



    this.initiaLizeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {

  }



  initiaLizeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024

    })

    this.uploader.onAfterAddingFile = (file) => (file.withCredentials = false)

    // photo needs to be reflected as soon as its uploaded
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        }
        this.photos.push(photo);
      }
    }
  }


  setMainPhoto(photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      console.log("Photo set to main");
    }, error => {
      this.alertify.error(error)
    })
  }






}
