import { ref } from 'vue';

import type { RequestContext, Options } from './index.d';

const state = {
  requests: ref<RequestContext[]>([]),
  options: ref<Options | undefined>(),
};

export function useDevtools() {
  function resetRequests() {
    state.requests.value = [];
  }

  function setRequest(request: RequestContext) {
    state.requests.value.push(request);
  }

  return {
    ...state,
    setRequest,
    resetRequests,
  };
}
