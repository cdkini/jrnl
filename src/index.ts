import { API } from './api';

function main() {
  const api = new API({port: 3000});
  api.listenAndServe();
}

if (require.main === module) {
  main();
}
