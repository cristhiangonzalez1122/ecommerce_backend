import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Imagenes} from '../models';
import {ImagenesRepository} from '../repositories';

export class ImagenController {
  constructor(
    @repository(ImagenesRepository)
    public imagenesRepository : ImagenesRepository,
  ) {}

  @post('/imagenes')
  @response(200, {
    description: 'Imagenes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Imagenes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {
            title: 'NewImagenes',
            exclude: ['id'],
          }),
        },
      },
    })
    imagenes: Omit<Imagenes, 'id'>,
  ): Promise<Imagenes> {
    return this.imagenesRepository.create(imagenes);
  }

  @get('/imagenes/count')
  @response(200, {
    description: 'Imagenes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Imagenes) where?: Where<Imagenes>,
  ): Promise<Count> {
    return this.imagenesRepository.count(where);
  }

  @get('/imagenes')
  @response(200, {
    description: 'Array of Imagenes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Imagenes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Imagenes) filter?: Filter<Imagenes>,
  ): Promise<Imagenes[]> {
    return this.imagenesRepository.find(filter);
  }

  @patch('/imagenes')
  @response(200, {
    description: 'Imagenes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {partial: true}),
        },
      },
    })
    imagenes: Imagenes,
    @param.where(Imagenes) where?: Where<Imagenes>,
  ): Promise<Count> {
    return this.imagenesRepository.updateAll(imagenes, where);
  }

  @get('/imagenes/{id}')
  @response(200, {
    description: 'Imagenes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Imagenes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Imagenes, {exclude: 'where'}) filter?: FilterExcludingWhere<Imagenes>
  ): Promise<Imagenes> {
    return this.imagenesRepository.findById(id, filter);
  }

  @patch('/imagenes/{id}')
  @response(204, {
    description: 'Imagenes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Imagenes, {partial: true}),
        },
      },
    })
    imagenes: Imagenes,
  ): Promise<void> {
    await this.imagenesRepository.updateById(id, imagenes);
  }

  @put('/imagenes/{id}')
  @response(204, {
    description: 'Imagenes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() imagenes: Imagenes,
  ): Promise<void> {
    await this.imagenesRepository.replaceById(id, imagenes);
  }

  @del('/imagenes/{id}')
  @response(204, {
    description: 'Imagenes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.imagenesRepository.deleteById(id);
  }
}
