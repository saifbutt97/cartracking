import { Injectable } from "@nestjs/common"
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator"
import { IsUniqeInterface } from "src/decorators/is-unique/is-unique.decorator"
import { EntityManager } from "typeorm"

@ValidatorConstraint({name: 'IsUniqueConstraint', async: true})
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}
    async validate(
        value: any,
        args?: ValidationArguments
        ): Promise<boolean> {
            // catch options from decorator
            const {tableName, column}: IsUniqeInterface = args.constraints[0]
            // database query check data is exists
            const dataExist = await this.entityManager.getRepository(tableName)
                .createQueryBuilder(tableName)
                .where({[column]: value})
                .getExists()
            
            return !dataExist
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        const field: string = validationArguments.property
        return `${field} already exists`
    }
}