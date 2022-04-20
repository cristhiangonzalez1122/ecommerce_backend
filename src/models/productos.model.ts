import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Marca} from './marca.model';
import {Categoria} from './categoria.model';
import {CategoriaProducto} from './categoria-producto.model';
import {Imagenes} from './imagenes.model';

@model()
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

  @hasMany(() => Categoria, {through: {model: () => CategoriaProducto, keyFrom: 'id_producto', keyTo: 'id_categoria'}})
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
