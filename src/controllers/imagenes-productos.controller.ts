/* eslint-disable @typescript-eslint/naming-convention */
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Imagenes, Productos} from '../models';
import {ImagenesRepository} from '../repositories';

export class ImagenesProductosController {
  constructor(
    @repository(ImagenesRepository)
    public imagenesRepository: ImagenesRepository,
  ) {}

  @get('/imagenes/{id}/productos', {
    responses: {
      '200': {
        description: 'Productos belonging to Imagenes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async getProductos(
    @param.path.number('id') id: typeof Imagenes.prototype.id,
  ): Promise<Productos> {
    return this.imagenesRepository.pertenece_a_producto(id);
  }
}
