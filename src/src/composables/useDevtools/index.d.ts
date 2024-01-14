export interface Options {
  preserveLog: boolean;
}

export interface DebugBarContext {
  __meta: Meta
  php: Php
  messages: Messages
  time: Time
  memory: Memory
  exceptions: Exceptions
  views: Views
  route: Route
  queries: Queries
  models: Models
  gate: Gate
}

export interface Meta {
  id: string
  datetime: string
  utime: number
  method: string
  uri: string
  ip: string
}

export interface Php {
  version: string
  interface: string
}

export interface Messages {
  count: number
  messages: any[]
}

export interface Time {
  start: number
  end: number
  duration: number
  duration_str: string
  measures: Measure[]
}

export interface Measure {
  label: string
  start: number
  relative_start: number
  end: number
  relative_end: number
  duration: number
  duration_str: string
  memory: number
  memory_str: string
  params: any[]
  collector: any
}

export interface Memory {
  peak_usage: number
  peak_usage_str: string
}

export interface Exceptions {
  count: number
  exceptions: any[]
}

export interface Views {
  nb_templates: number
  templates: any[]
}

export interface Route {
  uri: string
  middleware: string
  controller: string
  namespace: any
  where: any[]
  as: string
  file: string
}

export interface Queries {
  nb_statements: number
  nb_failed_statements: number
  accumulated_duration: number
  accumulated_duration_str: string
  statements: Statement[]
}

export interface Statement {
  sql: string
  type: string
  params: any[]
  bindings: string[]
  hints: any
  show_copy: boolean
  backtrace: Backtrace[]
  duration: number
  duration_str: string
  stmt_id: string
  connection: string
  start_percent: number
  width_percent: number
}

export interface Backtrace {
  index: number
  namespace?: string
  name: string
  line: number
}

export interface Models {
  data: {
    AppModelsMediaMedia: number
    AppModelsCompanyCompoundSetting: number
    AppModelsCompanyCompany: number
    AppModelsJobJob: number
    AppModelsJobCompoundJobRide: number
    AppModelsUserRole: number
    AppModelsUserUser: number
  }[],
  count: number
}

export interface Gate {
  count: number
  messages: any[]
}

export interface RequestContext {
  url: string;
  context: DebugBarContext;
}
