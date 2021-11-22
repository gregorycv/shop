import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { authenticationMiddleware, roleMiddleware } from '../middleware';
import { ProductCreationAttributes as CreateProductDto } from '../models/product';
import { ROLE } from '../utils/constants';
import { db } from '../db';

class ProductController implements Controller {
  public path = '/products';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, this.getProductById);
    this.router.post(this.path, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.createProduct);
    this.router.patch(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.modifyProduct);
    this.router.delete(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.deleteProduct);
  }

  private getAllProducts = async (request: Request, response: Response, next: NextFunction) => {
    const { productTypeId } = request.query;
    let products;
    try {
      if (productTypeId) {
        products = await db.Product.findAll({ where: { productTypeId } });
      } else {
        products = await db.Product.findAll();
      }
      response.send(products);
    } catch (error) {
      next(error);
    }
  }

  private getProductById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const product = await db.Product.findOne({ where: { id } });
      if (product) {
        response.send(product);
      } else {
        next(new Error(`No product found under id ${id}`))
      }
    } catch (error) {
      next(error);
    }
  }

  // TODO: return 201 status code here
  private createProduct = async (request: Request, response: Response, next: NextFunction) => {
    const productData: CreateProductDto = request.body;
    try {
      const createdProduct = await db.Product.create(productData);
      response.send(createdProduct);
    } catch (error) {
      next(error);
    }
  }

  private modifyProduct = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const productData: CreateProductDto = request.body;
    try {
      const updatedProduct = await db.Product.update(productData, { where: { id } });
      if (updatedProduct) {
        response.send(updatedProduct);
      } else {
        next(new Error(`No product found under id ${id}`))
      }
    } catch (error) {
      next(error);
    }
  }

  private deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      const successResponse = await db.Product.destroy({ where: { id } });
      if (successResponse) {
        response.sendStatus(200);
      } else {
        next(new Error(`No product found under id ${id}`));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
