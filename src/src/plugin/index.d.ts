import type { DebugBarContext } from '~/composables/useDevtools';

export type ResponseCallable = (context: unknown, url: string) => void;

export interface Options {
  onAfterFetch: (context: any) => void;
  responsePath: string | ResponseCallable;
}
