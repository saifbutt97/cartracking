import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/user/user-roles.enum';

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
