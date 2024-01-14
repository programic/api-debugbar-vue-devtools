import { get } from 'lodash';
import { registerDevtools, afterFetch } from '~/devtools';
import { useDevtools } from '../composables/useDevtools';

import type { App } from '@vue/devtools-api';
import type { Options } from './index.d';

export default {
  install (app: App, options: Options) {
    const { setRequest, resetRequests, options: devtoolsOptions } = useDevtools();

    (function(){
      const rs = history.replaceState;
      history.replaceState = function() {
        // @ts-expect-error arguments do exist
        rs.apply(history, arguments);

        if (!devtoolsOptions.value?.preserveLog) {
          resetRequests();
        }
      };
    }());

    options?.onAfterFetch((context: unknown, url: string) => {
      let data;

      if (typeof options.responsePath === 'function') {
        data = options.responsePath(context);
      } else {
        data = get(context, options.responsePath);
      }

      if (!data) {
        console.warn('Debug data can not be found!');

        return;
      }

      setRequest({ context: data, url });
      afterFetch();
    });

    registerDevtools(app)
  }
}
