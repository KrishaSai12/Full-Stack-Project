// this file mainly handles  if the url has specific keyword our data should match with that and should give  only that particular data
// this file handles search filter and pagination operation

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
   

  }
 
  search() {
    let keyword = this.queryStr.keyword ? 
    {
      name: { //we are searching the query with name field
        $regex: this.queryStr.keyword, // $regex - it will search the data based on keyword in the database
        $options: 'i' // this command will make the keyword case insensitive  it will take lower or higher
      }
    } : {};
    

    this.query = this.query.find({ ...keyword }) // it will find based on the object keyword from the database
    return this;
  }


  filter() {
    const queryStrCopy = { ...this.queryStr }// from this we will only take some field so we copy the querystring

    // removing fields from query because in queryString we give keyword like some more fields that keyword will not present in our data

    const removeFields = ['keyword', 'limit', 'page']; // these fields should get removed
    removeFields.forEach((field) => {
      delete queryStrCopy[field];
    })

    // this query is for filter the query based on the price field 

    let queryStr = JSON.stringify(queryStrCopy); // this is kept because to add the $ sign
   

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)// this will check gt or gte or lt or lte and we adding the value with $ symbol so only we can take values from mongoose
   
    const parsedQuery = queryStr;

    this.query.find(JSON.parse(parsedQuery));  // it will based on the fields that get from the queryStrCopy in this unwanted fields are  get deleted
   
    return this;

  }
  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // this is used to take current page if not page available default 1 qill be set
    const skip = resPerPage * (currentPage - 1); // for ex : if resPerPage is 2 and currentPage is 3 then 3-1 will be 2 and 2*2 is 4 so the skip will take the data after 4th data

    this.query.limit(resPerPage).skip(skip); // this function will limit the data in the page and take the value based on skip

    return this;

  }
}


module.exports = APIFeatures;