import { config, RouterLinkStub } from '@vue/test-utils';

config.global.renderStubDefaultSlot = true;
config.global.plugins = [];
config.global.mocks = {
  $t: (key: string): string => key,
};
config.global.stubs = {
  RouterLink: RouterLinkStub,
};
config.global.directives = {
  Tippy: {},
};
