import { UpdateUserDto } from './../users/dto/update-user.dto';
import { UsersService } from './../users/service/users.service';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cloudinary } from './cloudinary.prodider';
import * as fs from 'fs';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(Cloudinary) private cloudinary,
    private usersService: UsersService,
  ) {}

  async uploadImage(path: any, userId: string): Promise<any> {
    this.cloudinary.config({
      cloud_name: 'du4arxzzj',
      api_key: '821499727673838',
      api_secret: 'hDcEoltxpFdpSkkBeffwV7-Rqso',
    });
    const userUpdate = new UpdateUserDto();

    const result = await this.cloudinary.uploader.upload(path, function(
      result: any,
      error: any,
    ) {
      if (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        fs.unlink(path, err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Deteled!!');
          }
        });
      }
    });

    userUpdate.urlAvatar = result.secure_url;

    const update = await this.usersService.updateOne(userId, userUpdate);
    return update;
  }

  async uploadImageBanner(path: any, userId: string): Promise<any> {
    this.cloudinary.config({
      cloud_name: 'du4arxzzj',
      api_key: '821499727673838',
      api_secret: 'hDcEoltxpFdpSkkBeffwV7-Rqso',
    });
    const userUpdate = new UpdateUserDto();

    const result = await this.cloudinary.uploader.upload(path, function(
      result: any,
      error: any,
    ) {
      if (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        fs.unlink(path, err => {
          if (err) {
            console.log(err);
          } else {
            console.log('Deteled!!');
          }
        });
      }
    });

    userUpdate.urlBanner = result.secure_url;

    const update = await this.usersService.updateOne(userId, userUpdate);
    return update;
  }
}
