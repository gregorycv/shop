import { authenticationMiddleware, roleMiddleware } from '../middleware';
import { NextFunction, Request, Response, Router } from 'express';
import { Controller } from '../interfaces/controller.interface';
import { CreateOrderDto } from '../interfaces/order';
import { db } from '../db';
import { ROLE } from '../utils/constants';
import OrderService from '../services/order-service';

class OrderController implements Controller {
  public path = '/orders';
  public router = Router();
  public orderService = new OrderService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, authenticationMiddleware, this.getAllUserOrders);
    this.router.get(`${this.path}/all`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.getAllOrders);

    this.router.get(`${this.path}/:id`, authenticationMiddleware, this.getUserOrderById);
    this.router.get(`${this.path}/all/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.getOrderById);

    this.router.post(this.path, authenticationMiddleware, this.createOrder);
    this.router.patch(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.updateOrderStatusById);
    this.router.patch(this.path, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.updateOrdersStatus);
    this.router.delete(`${this.path}/:id`, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.deleteOrderById);
    this.router.delete(this.path, authenticationMiddleware, roleMiddleware(ROLE.ADMIN), this.deleteOrders);
  }

  // TODO: refactor admin/user router to prevent code repetition
  private getAllUserOrders = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;
    try {
      const orders = await db.Order.findAll({ where: { id } });
      response.send(orders);
    } catch (error) {
      next(error);
    }
  };

  private getAllOrders = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const orders = await db.Order.findAll();
      response.send(orders);
    } catch (error) {
      next(error);
    }
  };

  private getUserOrderById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { user } = request;
    try {
      const order = await db.Order.findOne({ where: { id, userId: user.id } });
      if (order) {
        response.send(order);
      } else {
        next(new Error('No such order found error.'));
      }
    } catch (error) {
      next(error);
    }
  };

  private getOrderById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      const order = await db.Order.findOne({ where: { id } });
      if (order) {
        response.send(order);
      } else {
        next(new Error('No such ordere found error.'));
      }
    } catch (error) {
      next(error);
    }
  };

  // TODO: return 201 status code here
  private createOrder = async (request: Request, response: Response, next: NextFunction) => {
    const orderData: CreateOrderDto = request.body;
    try {
      const createdOrder = await this.orderService.placeOrder(orderData);
      response.send(createdOrder);
    } catch (error) {
      next(error);
    }
  };

  private updateOrderStatusById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { orderStatus } = request.body;
    try {
      const updatedOrder = await db.Order.update({ status: orderStatus }, { where: { id } });
      response.send(updatedOrder);
    } catch (error) {
      next(error);
    }
  };

  private updateOrdersStatus = async (request: Request, response: Response, next: NextFunction) => {
    const { orderStatus, orderIds } = request.body;
    try {
      const updatedOrder = await db.Order.update({ status: orderStatus }, { where: { id: orderIds } });
      response.send(updatedOrder);
    } catch (error) {
      next(error);
    }
  };

  private deleteOrderById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
      const successResponse = await db.Order.destroy({ where: { id } });
      if (successResponse) {
        response.sendStatus(204);
      } else {
        throw new Error(`No order found under id ${id}`);
      }
    } catch (error) {
      next(error);
    }
  };

  private deleteOrders = async (request: Request, response: Response, next: NextFunction) => {
    const { orderIds } = request.body;
    try {
      const successResponse = await db.Order.destroy({ where: { id: orderIds } });
      if (successResponse) {
        response.sendStatus(204);
      } else {
        throw new Error(`Error. Something went wrong while deleting orders`);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
