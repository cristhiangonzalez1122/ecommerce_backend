import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Imagenes, ImagenesRelations, Productos} from '../models';
import {ProductosRepository} from './productos.repository';

export class ImagenesRepository extends DefaultCrudRepository<
  Imagenes,
  typeof Imagenes.prototype.id,
  ImagenesRelations
> {

  public readonly pertenece_a_producto: BelongsToAccessor<Productos, typeof Imagenes.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Imagenes, dataSource);
    this.pertenece_a_producto = this.createBelongsToAccessorFor('pertenece_a_producto', productosRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a_producto', this.pertenece_a_producto.inclusionResolver);
  }
}
