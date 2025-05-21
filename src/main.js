import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/Lara';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
    Button,
    Card,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog,
    DialogService,
    Drawer,
    FloatLabel,
    IconField,
    InputIcon,
    InputText,
    SelectButton,
    Textarea,
    Toast,
    ToastService,
    Toolbar
} from "primevue";

import i18n from "@/i18n.js";
import router from "./router/index.js";
const app = createApp(App);

app.use(PrimeVue, { theme: { preset: Lara }, ripple: true })
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-drawer', Drawer)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-select-button', SelectButton)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast);

app.use(router);

app.use(i18n);

app.mount('#app');