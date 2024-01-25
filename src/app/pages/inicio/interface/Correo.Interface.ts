import { ClientsTable } from "./ClientsTable.interface";

export interface CorreoInterface {
  asunto: string;
  destinatarios: Array<string>;
  contenido: string;
}
