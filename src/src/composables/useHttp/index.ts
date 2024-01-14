/* eslint-disable import/no-cycle */
import { createFetch, useFetch as useDefaultFetch } from '@vueuse/core';
import { ref } from 'vue';
import { unrefDeserializedObject } from './helpers';

import type { UseFetchOptions, MaybeRefOrGetter } from '@vueuse/core';
import type { HttpErrors, BearerToken, HttpResponse, Hooks } from './index.d';

const apiBaseUrl = ''; //process.env.VITE_API_URL;

export const bearerToken = ref<BearerToken>(null);

export const hooks: Hooks = {
  afterFetch: [],
  afterFetchError: [],
};

export async function useFetchCookies(): Promise<void> {
  await useDefaultFetch(`${apiBaseUrl}sanctum/csrf-cookie`, {
    credentials: 'include',
  }, {
    immediate: true,
  });
}

export function onAfterFetch(callback: Hooks['afterFetch'][0]) {
  hooks.afterFetch.push(callback);
}

const useFetch = createFetch({
  baseUrl: apiBaseUrl,
  combination: 'overwrite',
});

export function useHttp<R, E = HttpErrors>(
  url: MaybeRefOrGetter<string>,
  options?: RequestInit,
  useFetchOptions?: UseFetchOptions,
): HttpResponse<R, E> {
  const headers: HeadersInit = {
    'Cache-Control': 'no-cache',
    ...options?.headers ?? {},
  };

  const fetchOptions: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      ...headers,
      Accept: 'application/json',
      Authorisation: `Bearer ${bearerToken.value}`,
    },
  };

  // @ts-expect-error modified error and meta types ignored
  return useFetch<R>(
    url,
    fetchOptions,
    {
      ...useFetchOptions,
      refetch: useFetchOptions?.refetch ?? false,
      immediate: useFetchOptions?.immediate ?? false,
      async beforeFetch(context) {
        if (typeof context.options.body === 'string') {
          const deserializedBody = unrefDeserializedObject(JSON.parse(context.options.body));
          context.options.body = JSON.stringify(deserializedBody);
        }

        return context;
      },
      afterFetch(context) {
        const data = JSON.parse(context.data);

        if (data?.meta) {
          Object.defineProperty(data, 'meta', {
            value: Object.freeze(data?.meta),
            enumerable: false,
            writable: false,
          });
        }

        if (data?.meta) {
          Object.defineProperty(data?.data, 'meta', {
            value: Object.freeze(data?.meta),
            enumerable: false,
            writable: false,
          });
        }

        // @ts-expect-error response.meta doesn't exists
        context.response.meta = data?.meta ?? null;
        context.data = data?.data ?? data ?? null;

        hooks.afterFetch.forEach(callback => {
          callback(context, context.response.url);
        });

        return context;
      },
      onFetchError(context) {
        try {
          context.error = JSON.parse(context.data);
        } catch {
          context.error = context.data;
        }

        return context;
      },
    },
  );
}
