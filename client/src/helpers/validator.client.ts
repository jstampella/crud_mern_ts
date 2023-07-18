import { validarNumeros, validarSoloLetras } from '../utils/common';

export const formValidations: { [key: string]: [(data: string | number) => boolean, string] } = {
  nombre: [
    (data: string | number) => {
      return typeof data === 'string' ? data.length >= 3 && validarSoloLetras(data) : false;
    },
    'El nombre no puede estar vacio',
  ],
  apellido: [
    (data: string | number) => {
      return typeof data === 'string' ? data.length >= 3 && validarSoloLetras(data) : false;
    },
    'El apellido no puede estar vacio',
  ],
  dni: [
    (data: string | number) => {
      return typeof data === 'string' ? validarNumeros(data) : false;
    },
    'dni debe ser solo numeros',
  ],
  sexo: [
    (data: string | number) => {
      return typeof data === 'string'
        ? data.toLowerCase().includes('m') || data.toLowerCase().includes('f')
        : false;
    },
    'debes seleccionar un sexo',
  ],
  telefono: [
    (data: string | number) => {
      return typeof data === 'string' ? validarNumeros(data) && data.length >= 8 : false;
    },
    'telefono debe ser solo numeros y minimo 8 digitos',
  ],
  // Agrega más validaciones de acuerdo a tus necesidades
};

export const formValidationsSearch: {
  [key: string]: [(data: string | number) => boolean, string];
} = {
  nombre: [
    (data: string | number) => {
      return typeof data === 'string'
        ? (data.length > 0 && validarSoloLetras(data)) || !data
        : false;
    },
    'El nombre debe ser solo letras',
  ],
  apellido: [
    (data: string | number) => {
      return typeof data === 'string'
        ? (data.length > 0 && validarSoloLetras(data)) || !data
        : false;
    },
    'El apellido debe ser solo letras',
  ],
  dni: [
    (data: string | number) => {
      return typeof data === 'string' ? validarNumeros(data) || !data : false;
    },
    'dni debe ser solo numeros',
  ],
};
