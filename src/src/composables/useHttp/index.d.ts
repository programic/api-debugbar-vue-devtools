import type { Ref } from 'vue';
import type { UseFetchReturn } from '@vueuse/core';

export type BearerToken = string | null;

type HookCallable = (context: unknown, url: string) => void;

export interface Hooks {
  afterFetch: HookCallable[],
  afterFetchError: HookCallable[],
};

export interface PaginationMetaLinks {
  url: string | null;
  active: boolean;
  label: string;
}

export interface Meta {
  links: PaginationMetaLinks[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  path: string;
  to: number;
}

export type UseFetchReturnWithMeta<R> = UseFetchReturn<R & { meta: Meta }>;

export type HttpErrors = Record<string, string[]>;
export interface ErrorResponse<T = HttpErrors> {
  errors: T;
  message: string;
}
export interface HttpError<T> {
  error: Ref<ErrorResponse<T>>;
}

export type HttpResponse<R, T = HttpErrors> = Omit<UseFetchReturnWithMeta<R>, 'error'>
  & HttpError<T>;
