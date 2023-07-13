export const parseStackError = (errors: string | undefined): string | undefined => {
  const lineas = errors?.split('\n');
  let result: string | null = null;
  if (!lineas) return undefined;
  for (const element of lineas) {
    if (element.startsWith('    at')) {
      result = element;
      break;
    }
  }
  if (!result) return undefined;
  const file = result.split('\\').pop();
  return file;
};
