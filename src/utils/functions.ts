/**
 * Parsea el error de una pila de llamadas y retorna el nombre del archivo donde ocurrió el error.
 *
 * @param errors - La cadena de errores de la pila de llamadas.
 * @returns El nombre del archivo donde ocurrió el error.
 */
export const parseStackError = (errors: string | undefined): string | undefined => {
  // Divide la cadena de errores en líneas
  const lineas = errors?.split('\n');

  let result: string | null = null;

  // Si no hay líneas, retorna undefined
  if (!lineas) return undefined;

  // Busca la línea que empieza con "    at"
  for (const element of lineas) {
    if (element.startsWith('    at')) {
      result = element;
      break;
    }
  }

  // Si no se encontró ninguna línea que empiece con "    at", retorna undefined
  if (!result) return undefined;

  // Obtiene el nombre del archivo separando la cadena por las barras invertidas y tomando la última parte
  const file = result.split('\\').pop();

  return file;
};
