import { authenticationMiddleware, roleMiddleware } from '../middleware';
import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { ProductTypeCreationAttributes as CreateProductTypeDto } from '../models/product-type';
import { db } from '../db';
import { ROLE } from '../utils/constants';

class ProductTypeController implements Controller {
  public path = '/product-types';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProductTypes);
    this.router.get(`${this.path}/:id`, this.getProductTypeById);
    this.router.post(this.path, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.createProductType);
    this.router.patch(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.modifyProductType);
    this.router.delete(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.deleteProductType);
  }

  private getAllProductTypes = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productTypes = await db.ProductType.findAll();
      response.send(productTypes);
    } catch (error) {
      next(error);
    }
  }

  private getProductTypeById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const productType = await db.ProductType.findOne({ where: { id } });
      if (productType) {
        response.send(productType);
      } else {
        next(new Error('No such product type found error.'))
      }
    } catch (error) {
      next(error);
    }
  }

  // TODO: return 201 status code here
  private createProductType = async (request: Request, response: Response, next: NextFunction) => {
    const productTypeData: CreateProductTypeDto = request.body;
    try {
      const createdProductType = await db.ProductType.create(productTypeData);
      response.send(createdProductType);
    } catch (error) {
      next(error);
    }
  }

  private modifyProductType = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const productTypeData: CreateProductTypeDto = request.body;
    try {
      const updatedProductType = await db.ProductType.update(productTypeData, { where: { id } });
      response.send(updatedProductType);
    } catch (error) {
      next(error);
    }
  }

  private deleteProductType = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      const successResponse = await db.ProductType.destroy({ where: { id } });
      if (successResponse) {
        response.sendStatus(200);
      } else {
        throw new Error(`No product type found under id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ProductTypeController;