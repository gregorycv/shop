import { authMiddleware } from './../middleware/authentication-middleware';
import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { db } from '../db';

class ProductTypeController implements Controller {
  public path = '/product-types';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProductTypes);
    this.router.get(`${this.path}/:id`, this.getProductTypeById);
    this.router.post(this.path, authMiddleware, this.createProductType);
    // this.router.patch(`${this.path}/:id`, authMiddleware, this.modifyProductType)
    // this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteProductType);
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

  private createProductType = async (request: Request, response: Response, next: NextFunction) => {
    response.send('createProductType');
  }

  private modifyProductType = async (request: Request, response: Response, next: NextFunction) => {
    console.log('modifyProductType');
  }

  private deleteProductType = async (request: Request, response: Response, next: NextFunction) => {
    console.log('deleteProductType');
  }
}

export default ProductTypeController;