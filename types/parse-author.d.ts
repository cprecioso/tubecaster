declare module "parse-author" {
  namespace parse {
    interface Author {
      name: string;
      email: string;
      url: string;
    }
  }
  function parse(author: string): Partial<parse.Author>;
  export = parse;
}
