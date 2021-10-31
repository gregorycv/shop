import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { db } from '../db';

class ProductController implements Controller {
  public path = '/products';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllProducts);
  }

  private getAllProducts = async (request: Request, response: Response, next: NextFunction) => {
    const { product_type_id } = request.query;
    let products;
    if (product_type_id) {
      products = await db.Product.findAll({ where: { product_type_id } });
    } else {
      products = await db.Product.findAll();
    }
  }


}

export default ProductController;