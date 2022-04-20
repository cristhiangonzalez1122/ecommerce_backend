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
CategoriaProducto,
Categoria,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosCategoriaController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Array of Productos has many Categoria through CategoriaProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.productosRepository.categorias(id).find(filter);
  }

  @post('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'create a Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoriaInProductos',
            exclude: ['id'],
          }),
        },
      },
    }) categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    return this.productosRepository.categorias(id).create(categoria);
  }

  @patch('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Productos.Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.productosRepository.categorias(id).patch(categoria, where);
  }

  @del('/productos/{id}/categorias', {
    responses: {
      '200': {
        description: 'Productos.Categoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.productosRepository.categorias(id).delete(where);
  }
}
