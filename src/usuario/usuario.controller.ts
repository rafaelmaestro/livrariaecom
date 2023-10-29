import { Body, Controller, Get, Post } from '@nestjs/common'
import { IsPublic } from '../auth/decorators/is-public.decorator'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { UsuarioService } from './usuario.service'

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @IsPublic()
    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto)
    }

    @Get(':cpf')
    async findByCpf(cpf: string) {
        const usuario = await this.usuarioService.findByCpf(cpf)
        return {
            ...usuario,
            senha: undefined,
        }
    }

    @Get(':cpf/enderecos')
    async findEnderecosByCpf(cpf: string) {
        const usuario = await this.usuarioService.findByCpf(cpf)
        return usuario.enderecos
    }
}
