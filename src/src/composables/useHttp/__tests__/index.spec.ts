import { describe, it, expect } from 'vitest';
import { flushPromises } from '@vue/test-utils';
import { waitForRequest } from '~/tests/mocks/http/server';
import { useHttp, validationErrors } from '..';

describe('the useHttp composable', () => {
  it('can fetch', async () => {
    expect.assertions(13);

    const url = 'jobs';
    const response = useHttp(url);

    expect(response.execute).toBeTypeOf('function');
    expect(response.isFetching.value).toBe(false);
    expect(response.isFinished.value).toBe(false);
    expect(response.data.value).toBeNull();
    expect(response.error.value).toBeNull();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    response.execute();

    expect(response.isFetching.value).toBe(true);
    expect(response.isFinished.value).toBe(false);
    expect(response.data.value).toBeNull();
    expect(response.error.value).toBeNull();

    await waitForRequest('GET', url);
    await flushPromises();

    expect(response.isFetching.value).toBe(false);
    expect(response.isFinished.value).toBe(true);
    expect(response.data.value).toBeDefined();
    expect(response.error.value).toBeNull();
  });

  it('can fetch directly', async () => {
    expect.assertions(8);

    const url = 'jobs';
    const response = useHttp(url, {}, { immediate: true });

    expect(response.isFetching.value).toBe(false);
    expect(response.isFinished.value).toBe(false);
    expect(response.data.value).toBeNull();
    expect(response.error.value).toBeNull();

    await waitForRequest('GET', url);
    await flushPromises();

    expect(response.isFetching.value).toBe(false);
    expect(response.isFinished.value).toBe(true);
    expect(response.data.value).toBeDefined();
    expect(response.error.value).toBeNull();
  });

  it('can fetch directly and await for request', async () => {
    expect.assertions(1);

    const url = 'jobs';
    const response = await useHttp(url, {}, { immediate: true }).get();

    expect(response.isFinished.value).toBe(true);
  });

  it('can post', async () => {
    expect.assertions(1);

    const url = 'logout';
    const response = useHttp(url, {}, { immediate: true }).post();

    await waitForRequest('POST', url);
    await flushPromises();

    expect(response.isFinished.value).toBe(true);
  });

  it('gets CSRF token when cookie is missing', async () => {
    expect.assertions(1);

    const url = 'logout';
    const response = useHttp(url, {}, { immediate: true }).post();

    await waitForRequest('GET', 'sanctum/csrf-cookie');
    await waitForRequest('POST', url);
    await flushPromises();

    expect(response.isFinished.value).toBe(true);
  });

  it('set validation errors when request returns 433', async () => {
    expect.assertions(5);

    expect(validationErrors.hasAnyError.value).toBe(false);

    const response = await useHttp('errors/validation', {}, { immediate: true }).post();

    expect(response.response.value?.status).toBe(422);
    expect(response.error.value).toStrictEqual({
      message: 'validation error',
      errors: {
        field: ['field error'],
      },
    });

    expect(validationErrors.hasAnyError.value).toBe(true);

    await useHttp('logout', {}, { immediate: true }).post();

    expect(validationErrors.hasAnyError.value).toBe(false);
  });

  it('redirects when request throws 401', async () => {
    expect.assertions(1);

    await useHttp('errors/unauthenticated', {}, { immediate: true }).get();

    expect(window.location.href).toBe('https://sso.auto.test/');
  });
});
