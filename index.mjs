import container from './src/container.mjs';
import createExpressApp from  './src/presentation/app.mjs';

const expressApp = createExpressApp(container.cradle);

const port = process.env.PORT || 3000

console.log(`Attempting to listen on port ${port}!`);

expressApp.listen(port, () => {
console.log(`Listening on port ${port}...`);
})