import { Empleado } from "./empleado.model";
import { Productos } from "./productos.model";

export class Inventario {
    _id?: string;
    date?: string;
    observation?: string;
    quantity?: string;
    quantityInStock?: string;
    idProduct?: string;
    idEmployee?: string;
    product?: Productos;
    employee?: Empleado;

}
