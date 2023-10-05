import { Livro } from '../entities/livro.entity'

export interface FindAllLivros {
    data: Livro[]
    paginacao: {
        pagina: number
        limite: number
        total: number
    }
}
