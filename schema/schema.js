const graphql = require("graphql");
const _ = require("lodash");
const Suburb = require("../models/suburb");
const Rating = require("../models/rating");
const Health = require("../models/health");
const Education = require("../models/education");
const Property = require("../models/property");
const Job = require("../models/job");
const School = require("../models/school");
const Neighbour = require("../models/neighbour");
const Hospital = require("../models/hospitals");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLInt
} = graphql;

//dummy data

const SuburbType = new GraphQLObjectType({
  name: "Suburb",
  fields: () => ({
    _id: { type: GraphQLID },
    city: { type: GraphQLString },
    suburbName: { type: GraphQLString },
    rating: {
      type: RatingType,
      resolve(parent, arg) {
        return Rating.findOne({ suburbName: parent.suburbName });
      }
    },
    health: {
      type: HealthType,
      resolve(parent, arg) {
        return Health.findOne({ suburbName: parent.suburbName });
      }
    },
    education: {
      type: EducationType,
      resolve(parent, arg) {
        return Education.findOne({ suburbName: parent.suburbName });
      }
    },
    schools: {
      type: new GraphQLList(SchoolType),
      resolve(parent, arg) {
        return School.find({ suburbName: parent.suburbName });
      }
    },
    neighbours: {
      type: new GraphQLList(NeighbourType),
      resolve(parent, arg) {
        return Neighbour.find({ suburbName: parent.suburbName });
      }
    },
    hosptials: {
      type: new GraphQLList(HospitalType),
      resolve(parent, arg) {
        return Hospital.find({ suburbName: parent.suburbName });
      }
    },
    property: {
      type: PropertyType,
      resolve(parent, arg) {
        return Property.findOne({ suburbName: parent.suburbName });
      }
    },
    job: {
      type: JobType,
      resolve(parent, arg) {
        return Job.findOne({ suburbName: parent.suburbName });
      }
    }
  })
});

const NeighbourType = new GraphQLObjectType({
  name: "Neighbour",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    neighbour_name: { type: new GraphQLList(GraphQLString) }
  })
});

const RatingType = new GraphQLObjectType({
  name: "Rating",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    healthScore: { type: GraphQLFloat },
    educationScore: { type: GraphQLFloat },
    propetyScore: { type: GraphQLFloat },
    jobScore: { type: GraphQLFloat }
  })
});

const HealthType = new GraphQLObjectType({
  name: "Health",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    hospital: { type: GraphQLInt },
    gps: { type: GraphQLInt },
    beds: { type: GraphQLInt }
  })
});

const EducationType = new GraphQLObjectType({
  name: "Education",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    pre_school: { type: GraphQLInt },
    primary_school: { type: GraphQLInt },
    secondary_school: { type: GraphQLInt }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    price: { type: GraphQLInt }
  })
});

const SchoolType = new GraphQLObjectType({
  name: "School",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    school_name: { type: GraphQLString },
    icsea: { type: GraphQLInt },
    lga_average: { type: GraphQLInt },
    ts_ration: { type: GraphQLFloat },
    enrollment: { type: GraphQLInt },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat }
  })
});

const HospitalType = new GraphQLObjectType({
  name: "Hospital",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    hospital_name: { type: GraphQLString },
    beds: { type: GraphQLInt },
    longitude: { type: GraphQLFloat },
    latitude: { type: GraphQLFloat }
  })
});

const JobType = new GraphQLObjectType({
  name: "Job",
  fields: () => ({
    _id: { type: GraphQLID },
    suburbName: { type: GraphQLString },
    agriculture: { type: GraphQLInt },
    mining: { type: GraphQLInt },
    manufacture: { type: GraphQLInt },
    power_gas_water: { type: GraphQLInt },
    construction: { type: GraphQLInt },
    wholesale: { type: GraphQLInt },
    retail: { type: GraphQLInt },
    acc_food: { type: GraphQLInt },
    transport: { type: GraphQLInt },
    it: { type: GraphQLInt },
    finance_insure: { type: GraphQLInt },
    real_estate: { type: GraphQLInt },
    professional: { type: GraphQLInt },
    admin: { type: GraphQLInt },
    public: { type: GraphQLInt },
    health_care: { type: GraphQLInt },
    art: { type: GraphQLInt },
    other: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    suburb: {
      type: SuburbType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(suburbs, { name: args.name });
        return Suburb.findById(args.id);
      }
    },
    suburbByName: {
      type: SuburbType,
      args: { suburbName: { type: GraphQLString } },
      resolve(parent, args) {
        return Rating.findOne({ suburbName: args.suburbName });
      }
    },
    rating: {
      type: RatingType,
      args: { suburbName: { type: GraphQLString } },
      resolve(parent, args) {
        // return _.find(rating, { name: args.name });

        return Rating.findOne({ suburbName: args.suburbName });
        //return Rating.findById(args.id);
      }
    },
    suburbs: {
      type: new GraphQLList(SuburbType),
      resolve(parent, arges) {
        // return suburbs;
        return Suburb.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSuburb: {
      type: SuburbType,
      args: {
        city: { type: GraphQLString },
        suburbName: { type: GraphQLString }
      },
      resolve(parent, args) {
        let suburb = new Suburb({
          city: args.city,
          suburbName: args.suburbName
        });
        return suburb.save();
      }
    },
    addRating: {
      type: RatingType,
      args: {
        suburbName: { type: GraphQLString },
        healthScore: { type: GraphQLFloat },
        educationScore: { type: GraphQLFloat },
        propetyScore: { type: GraphQLFloat },
        jobScore: { type: GraphQLFloat }
      },
      resolve(parent, args) {
        let rating = new Rating({
          suburbName: args.suburbName,
          healthScore: args.healthScore,
          educationScore: args.educationScore,
          propetyScore: args.propetyScore,
          jobScore: args.jobScore
        });
        return rating.save();
      }
    },
    addHealth: {
      type: HealthType,
      args: {
        suburbName: { type: GraphQLString },
        hospital: { type: GraphQLInt },
        gps: { type: GraphQLInt },
        beds: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let health = new Health({
          suburbName: args.suburbName,
          hospital: args.hospital,
          gps: args.gps,
          beds: args.beds
        });
        return health.save();
      }
    },
    addProperty: {
      type: PropertyType,
      args: {
        suburbName: { type: GraphQLString },
        price: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let property = new Property({
          suburbName: args.suburbName,
          price: args.price
        });
        return property.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
