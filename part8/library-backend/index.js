require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } });
      }

      return await Book.find({});
    },
    allAuthors: async () => Author.find({}),
  },

  Book: {
    author: async ({ author }) => Author.findById(author),
  },

  Author: {
    bookCount: async (root) => Book.count({ author: root._id }),
  },

  Mutation: {
    addBook: async (root, args) => {
      const { title, author, published, genres } = args;

      let bookAuthor = await Author.findOne({ name: author });

      if (!bookAuthor) {
        bookAuthor = new Author({ name: author });
        await bookAuthor.save();
      }

      const newBook = new Book({
        author: bookAuthor._id.toString(),
        published,
        genres,
        title,
      });

      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return newBook;
    },
    editAuthor: async (root, args) => {
      const { name, setBornTo } = args;
      try {
        return await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        );
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
