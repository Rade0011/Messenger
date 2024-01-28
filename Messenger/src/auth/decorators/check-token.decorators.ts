import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/check-token.guards';

export const IS_TOKEN = 'isToken'
export const IsToken = () => {
    return applyDecorators(
        SetMetadata(IS_TOKEN, true),
        UseGuards(JwtGuard)
    )
}