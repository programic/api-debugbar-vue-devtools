import { isObject } from '@vueuse/core';
import { isRef } from 'vue';

import type { UnwrapRef } from 'vue';

function getValueFromDeserializedRef<T>(body: T): UnwrapRef<T> {
  // @ts-expect-error _value not exists
  // eslint-disable-next-line no-underscore-dangle
  return isRef(body) ? body._value : body;
}

export function unrefDeserializedObject(body: unknown): unknown {
  if (!isObject(body) && isRef(body)) {
    return getValueFromDeserializedRef(body);
  }

  if (isObject(body)) {
    const bodyObject = getValueFromDeserializedRef(body);

    for (const [key, value] of Object.entries(bodyObject)) {
      if (isObject(value) || isRef(value)) {
        bodyObject[key] = unrefDeserializedObject(getValueFromDeserializedRef(value));
      }

      if (Array.isArray(value)) {
        bodyObject[key] = value.map(valueValue => {
          return unrefDeserializedObject(valueValue);
        });
      }
    }

    return bodyObject;
  }

  if (Array.isArray(body)) {
    return body.map(value => {
      return unrefDeserializedObject(value);
    });
  }

  return body;
}
