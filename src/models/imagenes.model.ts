/* eslint-disable @typescript-eslint/naming-convention */
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Productos} from './productos.model';

@model({
  settings: {
    foreignKeys: {
      fk_imagen_id_producto: {
        name: 'fk_imagen_id_producto',
        entity: 'Productos',
        entityKey: 'id',
        foreignKey: 'id_producto',
      },
    },
  },
})
export class Imagenes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @belongsTo(() => Productos, {name: 'pertenece_a_producto'})
  id_producto: number;

  constructor(data?: Partial<Imagenes>) {
    super(data);
  }
}

export interface ImagenesRelations {
  // describe navigational properties here
}

export type ImagenesWithRelations = Imagenes & ImagenesRelations;
