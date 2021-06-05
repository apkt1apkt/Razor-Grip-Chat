declare global {
  type Obj<T = any> = { [x: string]: T };

  type ResolvePromise<T> = T extends PromiseLike<infer U> ? U : T;
}

export default undefined;
