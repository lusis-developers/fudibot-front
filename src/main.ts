import { createVueApp } from './bootloader';

import './style.css';

async function main() {
  const app = await createVueApp();

  app.mount('#app')
}

main();