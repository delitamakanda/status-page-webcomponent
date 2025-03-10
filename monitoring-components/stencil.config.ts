import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'monitoring-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    vueOutputTarget({
      componentCorePackage: 'monitoring-components',
      proxiesFile: '../packages/vue-library/lib/components.ts',
    }),
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
