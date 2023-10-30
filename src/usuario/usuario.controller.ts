import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { IsPublic } from '../auth/decorators/is-public.decorator'
import { CreateEnderecoDto } from './dto/create-endereco.dto'
import { CreateUsuarioDto } from './dto/create-usuario.dto'
import { Usuario } from './entities/usuario.entity'
import { UsuarioService } from './usuario.service'

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @IsPublic()
    @Post()
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto)
    }

    @Get('/relatorio')
    async getRelatorioUsuarios(@CurrentUser() user: Usuario) {
        return await this.usuarioService.getRelatorioUsuarios(user.cpf)
    }

    @Get('/:cpf')
    async findByCpf(@Param('cpf') cpf: string) {
        const usuario = await this.usuarioService.findByCpf(cpf)
        return {
            ...usuario,
            senha: undefined,
        }
    }

    @Get('/:cpf/enderecos')
    async findEnderecosByCpf(@Param('cpf') cpf: string) {
        const usuario = await this.usuarioService.findByCpf(cpf)
        return usuario.enderecos
    }

    @Put('/:cpf/enderecos')
    async addEndereco(@Param('cpf') cpf: string, @Body() createEnderecoDto: CreateEnderecoDto) {
        return await this.usuarioService.addEndereco(cpf, createEnderecoDto)
    }
}
