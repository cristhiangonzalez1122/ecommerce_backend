import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Productos,
  Marca,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosMarcaController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/marca', {
    responses: {
      '200': {
        description: 'Marca belonging to Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async getMarca(
    @param.path.number('id') id: typeof Productos.prototype.id,
  ): Promise<Marca> {
    return this.productosRepository.tiene_marca(id);
  }
}
