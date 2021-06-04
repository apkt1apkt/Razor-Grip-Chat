import { Context as _Context } from "@server/apollo/context";

declare global {
  namespace Resolver {
    type Context = _Context;

    type Resolvers<IObj extends {} = Obj> = {
      Mutation?: Obj<Func<IObj>>;
      Query?: Obj<Func<IObj>>;
      Subscription?: Obj<Subscription>;
      [x: string]: Obj<Func<IObj>> | Obj<Subscription> | undefined;
    };

    type Func<IObj extends {} = Obj, TReturn = Promise<any> | any> = (
      obj: IObj,
      args: Obj,
      context: Context,
      info: Obj
    ) => TReturn;

    type Subscription = {
      subscribe: () => any;
    };
  }
}
