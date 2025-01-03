import { v4 as uuidv4 } from 'uuid';

import { diskStorage } from 'multer';
import path = require('path');
import { validAllFileMimeTypes } from './validMimeType';
import { mkdirSync } from 'fs';
import {
  BadRequestException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

export const uploader = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const path = `./uploads/${file.fieldname}`;
      mkdirSync(path, { recursive: true });
      return cb(null, path);
    },
    filename: (req, file, cb) => {
      const fileExtension: string = path.extname(file.originalname);
      const fileName: string = uuidv4() + fileExtension;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const fieldName = file.fieldname;
    const allowedMimeTypes = validAllFileMimeTypes[fieldName];
    console.log(allowedMimeTypes, allowedMimeTypes.includes(file.mimetype));
    allowedMimeTypes == '' || allowedMimeTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(
          new UnsupportedMediaTypeException(
            `Only ${allowedMimeTypes.join(
              ', ',
            )} files are allowed for file: ${fieldName}`,
          ),
          false,
        );
  },
};
export const dynamicMaxCountMiddleware = (maxCount: number) => {
  return (req: any, file: any, callback: any) => {
    if (req.files && req.files.length >= maxCount) {
      return callback(
        new BadRequestException(`Exceeded maximum file count of ${maxCount}`),
        false,
      );
    }
    callback(null, true);
  };
};
