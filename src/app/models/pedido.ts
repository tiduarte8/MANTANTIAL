import { CarritoInterface } from './carrito';

export interface PedidoInterface{
    id?:string;
    email?:string;
    fecha?:Date;
    Total?:number;
    estado?:string;
    direccion?:string;
    detalle?:CarritoInterface[];

}