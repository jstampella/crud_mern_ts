import mongoose from 'mongoose';
import removeAccents from 'remove-accents';

const clientSchema = new mongoose.Schema(
  {
    dni: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    sexo: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.index({ nombre: 'text', apellido: 'text' });

// Create a pre-inserMany middleware to remove accents
clientSchema.pre('insertMany', function (next, docs) {
  // Remove accents from the 'name' field (you can modify this for other fields too)
  docs.forEach((doc: { [x: string]: string }) => {
    for (const key in doc) {
      if (typeof doc[key] === 'string') {
        doc[key] = removeAccents(doc[key]);
      }
    }
  });
  next();
});

// Create a pre-save middleware to remove accents
clientSchema.pre('save', function (next) {
  this.nombre = removeAccents(this.nombre);
  this.apellido = removeAccents(this.apellido);
  next();
});

export default mongoose.model('Client', clientSchema);
