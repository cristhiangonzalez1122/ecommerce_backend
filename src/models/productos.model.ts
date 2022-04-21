/* eslint-disable @typescript-eslint/naming-convention */
import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {CategoriaProducto} from './categoria-producto.model';
import {Categoria} from './categoria.model';
import {Imagenes} from './imagenes.model';
import {Marca} from './marca.model';

@model({
  settings: {
    foreignKeys: {
      fk_producto_id_marca: {
        name: 'fk_producto_id_marca',
        entity: 'Marca',
        entityKey: 'id',
        foreignKey: 'id_marca',
      },
    },
  },
})
export class Productos extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  Existencia?: number;

  @property({
    type: 'number',
    default: 0,
  })
  Calificacion?: number;

  @property({
    type: 'number',
    default: 0,
  })
  Descuento?: number;

  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  @hasMany(() => Categoria, {
    through: {
      model: () => CategoriaProducto,
      keyFrom: 'id_producto',
      keyTo: 'id_categoria',
    },
  })
  categorias: Categoria[];

  @hasMany(() => Imagenes, {keyTo: 'id_producto'})
  imagenes: Imagenes[];

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
