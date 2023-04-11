/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/tasks/{taskId}': {
    /** Get task by taskId */
    get: {
      parameters: {
        path: {
          taskId: unknown;
        };
      };
      responses: {
        /** Task */
        200: {
          content: {
            'application/json': {
              /** @description task name. */
              name?: string;
              /** @description task description. */
              info?: string;
              /** @description Task importance */
              isImportant?: boolean;
              /** @description Task completance */
              isCompleted?: boolean;
              /** @description task id. */
              id?: number;
            };
          };
        };
      };
    };
    /** Delete task */
    delete: {
      parameters: {
        path: {
          taskId: unknown;
        };
      };
      responses: {
        /** Auto generated using Swagger Inspector */
        200: {
          content: {
            'application/json; charset=utf-8': string;
          };
        };
      };
    };
    /** Update task by taskId */
    patch: {
      parameters: {
        path: {
          taskId: unknown;
        };
      };
      responses: {
        /** Task */
        200: {
          content: {
            'application/json': {
              /** @description task name. */
              name?: string;
              /** @description task description. */
              info?: string;
              /** @description Task importance */
              isImportant?: boolean;
              /** @description Task completance */
              isCompleted?: boolean;
              /** @description task id. */
              id?: number;
            };
          };
        };
      };
      requestBody: {
        content: {
          'application/json': {
            isImportant?: boolean;
            name?: string;
            info?: string;
            isCompleted?: boolean;
          };
        };
      };
    };
  };
  '/tasks': {
    /** Get all tasks */
    get: {
      parameters: {
        query: {
          isImportant?: boolean;
          name_like?: string;
          isCompleted?: boolean;
        };
      };
      responses: {
        /** Task */
        200: {
          content: {
            'application/json': {
              /** @description task name. */
              name?: string;
              /** @description task description. */
              info?: string;
              /** @description Task importance */
              isImportant?: boolean;
              /** @description Task completance */
              isCompleted?: boolean;
              /** @description task id. */
              id?: number;
            }[];
          };
        };
      };
    };
    /** Create task */
    post: {
      responses: {
        /** Task */
        200: {
          content: {
            'application/json': {
              /** @description task name. */
              name?: string;
              /** @description task description. */
              info?: string;
              /** @description Task importance */
              isImportant?: boolean;
              /** @description Task completance */
              isCompleted?: boolean;
              /** @description task id. */
              id?: number;
            };
          };
        };
      };
      requestBody: {
        content: {
          'application/json': {
            isImportant?: boolean;
            name?: string;
            info?: string;
          };
        };
      };
    };
  };
}

export interface components {}

export interface operations {}

export interface external {}
