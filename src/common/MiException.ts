class MiExcepcion extends Error {
  code: number;

  constructor(mensaje: string, codigo: number) {
    super(mensaje);
    Object.setPrototypeOf(this, MiExcepcion.prototype);
    this.code = codigo;
  }
}

export default MiExcepcion;
