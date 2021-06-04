const rootTypedefs = `
    type Query {
        _empty2: String

        hello: String
    }
   
    type Mutation {
        _empty2: String
    }
   
    type Subscription{
        _empty2: String
        helloCalled: Int
    }      
`;

export default rootTypedefs;
