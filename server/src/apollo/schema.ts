import merge from "lodash/merge";
import { makeExecutableSchema } from "apollo-server-express";

import rootTypedefs from "@server/apollo/root-typedefs";
import { ScalarTypedef, ScalarResolver } from "@server/apollo/scalar";
import { typedefs, resolvers } from "@server/crud";

export default makeExecutableSchema({
  typeDefs: [rootTypedefs, ScalarTypedef, ...typedefs],
  resolvers: merge(ScalarResolver, resolvers) as any,
});
