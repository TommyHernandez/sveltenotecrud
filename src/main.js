import App from "./App.svelte";
import './firebase.js';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'toastr/build/toastr.js';
import 'toastr/build/toastr.css';

const app = new App({
  target: document.body,
});

export default app;
