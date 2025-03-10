import { Plugin } from 'vue'
import {  defineCustomElements } from 'monitoring-components/loader';

export const ComponentLibraryPlugin: Plugin = {
    async install() {
        defineCustomElements();
    },
};