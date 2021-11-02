export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

// TODO: create models and store these in DB, populate on first startup
export enum ORDER_STATUS {
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
}

export enum ORDER_TYPE {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY'
}
