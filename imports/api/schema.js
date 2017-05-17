import { Random } from 'meteor/random';
import { UserResolvers, UserSchema } from './User';
import { ShopResolvers, ShopSchema } from './Shop';
import { MallResolvers, MallSchema } from './Mall';
import { AttachmentResolvers, AttachmentSchema } from './Attachment';
import { merge } from 'lodash';


export const BaseSchemas = [`
type Geometry {
	    type: String!
	    coordinates: [Int]
	}

scalar Date

type Address {
	    fullAddress: String!
	    lat: String
	    lng: String
	    geometry: Geometry
	    placeId: String
	    street: String
	    city: String
	    state: String
	    zip: Int
	    country: Int
	    maps_url: String
	}
`];


export const BaseResolvers = {
  	Date: {
	  __parseValue(value) {
	    return new Date(value); // value from the client
	  },
	  __serialize(value) {
	    return value.toISOString(); // value sent to the client
	  },
	  __parseLiteral(ast) {
	    return ast.value;
	  },
	},
};

export const typeDefs = [
	...BaseSchemas,
	...UserSchema, 
	...ShopSchema,
	...MallSchema,
	...AttachmentSchema
];


export const resolvers = merge(
	BaseResolvers,
	UserResolvers, 
	ShopResolvers,
	MallResolvers,
	AttachmentResolvers
);


