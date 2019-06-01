import { GraphqlContext } from './../../type'
import { gql, IResolverObject } from 'apollo-server-koa'

const typeDef = gql`
  type User @sql(table: "users") {
    id: ID!
    name: String!
    email: String!
    createTime: DateTime! @sql(col: "create_time")
    todos: [Todo!]
  }

  extend type Query {
    users: [User!]
  }
`

const resolver: IResolverObject<any, GraphqlContext> = {
  Todo: {
  },
  Query: {
    users ({}, {}, { models, utils }, info: any) {
      const attributes = utils.getModelAttrs(info, models)
      return models.users.findAll({
        attributes
      })
    }
  }
}

export {
  typeDef,
  resolver
}