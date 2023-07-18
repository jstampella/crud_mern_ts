import logger from '../config/winston';
import { ClientModel } from '../models';

export const loadJson = async (): Promise<void> => {
  // Cargar el archivo JSON
  const data = require('../data/clients.mock.json');
  await ClientModel.deleteMany({});
  // Insertar los documentos en la base de datos
  try {
    const loaded = await ClientModel.insertMany(data);
    console.log('Documentos insertados con éxito:' + loaded.length);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 11000) {
      const duplicatedDocuments = error.writeErrors?.length || 0;
      logger.info(`Error: Duplicate key | Número de documentos duplicados: ${duplicatedDocuments} | Archivo kpi`);
    } else {
      logger.warning('Ocurrio un error al cargar el archivo json de clientes');
    }
  }
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       console.log('Documentos insertados con éxito:', docs.length);
  //     }
  //   });
};
