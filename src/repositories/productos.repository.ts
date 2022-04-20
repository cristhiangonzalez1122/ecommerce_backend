import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Productos, ProductosRelations, Marca, Categoria, CategoriaProducto, Imagenes} from '../models';
import {MarcaRepository} from './marca.repository';
import {CategoriaProductoRepository} from './categoria-producto.repository';
import {CategoriaRepository} from './categoria.repository';
import {ImagenesRepository} from './imagenes.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly tiene_marca: BelongsToAccessor<Marca, typeof Productos.prototype.id>;

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaProducto,
          typeof Productos.prototype.id
        >;

  public readonly imagenes: HasManyRepositoryFactory<Imagenes, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('CategoriaProductoRepository') protected categoriaProductoRepositoryGetter: Getter<CategoriaProductoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('ImagenesRepository') protected imagenesRepositoryGetter: Getter<ImagenesRepository>,
  ) {
    super(Productos, dataSource);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenesRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaProductoRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.tiene_marca = this.createBelongsToAccessorFor('tiene_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene_marca', this.tiene_marca.inclusionResolver);
  }
}
