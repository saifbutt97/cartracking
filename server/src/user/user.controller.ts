import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilesFieldInterceptor } from 'src/uploader/files-field.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('/upload')
  @UseInterceptors(
    new FilesFieldInterceptor('dp', 2),
    new FilesFieldInterceptor('background', 1),
    // Add more FilesFieldInterceptor for additional fields
  )
  // @UseInterceptors(
  // FileFieldsInterceptor(
  //   [
  //     { name: 'dp', maxCount: 2 },
  //     { name: 'background', maxCount: 3 },
  //     // Add more file fields as needed
  //   ],
  //   uploader,
  // ),
  // MulterModule.register({ fieldName: 'dp', maxCount: 2 } }),
  // MulterModule.register({ fieldName: 'background', maxCount: 3 }),
  // FilesField1Interceptor,
  // )
  async uploadFile(
    @UploadedFiles()
    files: {
      dp: Express.Multer.File[];
      background: Express.Multer.File[];
    },
  ): Promise<string> {
    console.log(files);
    return 'success';
  }
}
