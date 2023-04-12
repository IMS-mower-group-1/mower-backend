import container from './src/container.mjs';
import createExpressApp from  './src/presentation/app.mjs';

const expressApp = createExpressApp(container.cradle);

const port = process.env.PORT || 3000

expressApp.listen(port, () => {
console.log(`Listening on port ${port}...`);
})