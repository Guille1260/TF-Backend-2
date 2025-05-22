import mongoose from 'mongoose';
import config from './config/config.js';

mongoose.connect(config.mongodbUri)
  .then(() => console.log('MongoDB conectado'))
  .catch((e) => console.error('Error en conexión MongoDB:', e));

export default mongoose;
