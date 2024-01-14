import type { RequestContext } from '~/composables/useDevtools/index.d';

export function getTags(context: RequestContext['context']) {
  return [
    {
      label: `${context.queries.nb_statements} queries`,
      textColor: 0xFFFFFF,
      backgroundColor: getQueryColor(context.queries.nb_statements),
    },
    {
      label: `duration ${context.time.duration_str}`,
      textColor: 0xFFFFFF,
      backgroundColor: getDurationColor(context.time.duration),
    },
  ];
}

function getQueryColor(statements: number): number {
  if (statements > 10) {
    return 0xca8a04;
  }

  if (statements > 3) {
    return 0xca8a04;
  }

  return 0x16a34a;
}

function getDurationColor(duration: number): number {
  if (duration > 1) {
    return 0xca8a04;
  }

  if (duration > .5) {
    return 0xca8a04;
  }

  return 0x16a34a;
}
