import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsPublic } from './decorators/is-public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from './interfaces/AuthRequest'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}
