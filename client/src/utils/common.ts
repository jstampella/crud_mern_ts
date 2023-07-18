import queryString from 'query-string';
import { IClientFormSearch } from '../interfaces';

export const validarNumeros = (str: string): boolean => {
  const numerosRegex = /^[0-9]+$/;
  return numerosRegex.test(str);
};

export const validarSoloLetras = (cadena: string): boolean => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(cadena);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectToUrlParams = (obj: Record<string, any>): string => {
  const params = Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter(([_, value]: [string, any]) => value !== null && value !== undefined)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(([key, value]: [string, any]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return params;
};

// Crear una función que convierta los datos a un tipo seguro sin valores nulos
export const convertirSearchCliente = (
  datos: queryString.ParsedQuery<string>
): IClientFormSearch => {
  return {
    dni: datos.dni !== null && datos.dni ? datos.dni.toString() : '',
    nombre: datos.nombre !== null && datos.nombre ? datos.nombre.toString() : '',
    apellido: datos.apellido !== null && datos.apellido ? datos.apellido.toString() : '',
    sexo: datos.sexo !== null && datos.sexo ? datos.sexo.toString() : '',
  };
};

export const compartirObjetos = <T>(objeto1: T, objeto2: T): boolean => {
  for (const propiedad in objeto1) {
    if (
      Object.prototype.hasOwnProperty.call(objeto1, propiedad) &&
      Object.prototype.hasOwnProperty.call(objeto2, propiedad) &&
      objeto1[propiedad] !== objeto2[propiedad]
    ) {
      return false;
    }
  }

  return true;
};
