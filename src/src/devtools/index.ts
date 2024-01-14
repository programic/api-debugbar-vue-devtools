import { ref } from 'vue';
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { useDevtools } from '../composables/useDevtools';
import { getTags } from './helpers';

import type { App } from '@vue/devtools-api'

const devtoolsApi = ref();
const inspectorId = 'api-debugbar';

export function afterFetch () {
  devtoolsApi.value.sendInspectorTree(inspectorId);
  devtoolsApi.value.sendInspectorState(inspectorId);
}

export function registerDevtools(app: App) {
  const { requests, options } = useDevtools();

  setupDevtoolsPlugin({
    id: inspectorId,
    label: 'API debugbar',
    packageName: inspectorId,
    enableEarlyProxy: true,
    settings: {
      preserveLog: {
        label: 'Preserve log',
        type: 'boolean',
        defaultValue: false,
      },
    },
    app,
  }, api => {
    devtoolsApi.value = api;
    options.value = api.getSettings();

    api.addInspector({
      id: inspectorId,
      label: 'API debugbar',
      icon: 'assessment',
      treeFilterPlaceholder: 'Search requests',
      stateFilterPlaceholder: 'Search meta',
    });

    api.on.setPluginSettings(settings => {
      // @ts-ignore
      options.value = settings;
    });

    api.on.getInspectorTree((payload, context) => {
      if (payload.inspectorId === inspectorId) {
        payload.rootNodes = [
          {
            id: 'root',
            label: 'Requests',

            children: requests.value.sort((a, b) => {
              // @ts-ignore
              return new Date(a.context.__meta.datetime) - new Date(b.context.__meta.datetime);
            }).reverse().map(request => {
              const urlPath = request.context.__meta.uri.split('/').pop()?.split('?')[0]
              const date = new Date(request.context.__meta.datetime);
              return {
                id: request.context.__meta.id,
                label: `${date.toLocaleTimeString()} ${urlPath}`,
                tags: getTags(request.context),
              }
            }),
          },
        ];
      }
    });

    api.on.getInspectorState((payload, context) => {
      if (payload.inspectorId === inspectorId) {
        const request = requests.value.find(request => {
          return request.context.__meta.id === payload.nodeId;
        });

        if (request) {
          Object.keys(request.context).reverse().forEach(key => {
            payload.state = {
              ...payload.state,
              // @ts-ignore
              [key] : request.context?.[key],
            }
          });
        }
      }
    });
  });
}
