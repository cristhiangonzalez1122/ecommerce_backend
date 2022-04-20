import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Productos,
  Imagenes,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosImagenesController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Array of Productos has many Imagenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Imagenes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Imagenes>,
  ): Promise<Imagenes[]> {
    return this.productosRepository.imagenes(id).find(filter);
  }

  @post('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Imagenes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {
            title: 'NewImagenesInProductos',
            exclude: ['id'],
            optional: ['id_producto']
          }),
        },
      },
    }) imagenes: Omit<Imagenes, 'id'>,
  ): Promise<Imagenes> {
    return this.productosRepository.imagenes(id).create(imagenes);
  }

  @patch('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Productos.Imagenes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {partial: true}),
        },
      },
    })
    imagenes: Partial<Imagenes>,
    @param.query.object('where', getWhereSchemaFor(Imagenes)) where?: Where<Imagenes>,
  ): Promise<Count> {
    return this.productosRepository.imagenes(id).patch(imagenes, where);
  }

  @del('/productos/{id}/imagenes', {
    responses: {
      '200': {
        description: 'Productos.Imagenes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Imagenes)) where?: Where<Imagenes>,
  ): Promise<Count> {
    return this.productosRepository.imagenes(id).delete(where);
  }
}
