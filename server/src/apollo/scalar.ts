import { GraphQLDateTime } from "graphql-iso-date";

export const ScalarTypedef = `
  scalar DateTime
`;

export const ScalarResolver: any = {
  DateTime: GraphQLDateTime,
};
