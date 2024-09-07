import connectDB from './src/config/database';
import app from './src/server';

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
