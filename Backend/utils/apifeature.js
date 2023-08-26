class ApiFeatures {

    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {

        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i" // this means it should be case insentive
            }
        } : {};
        

        // console.log(keyword);
        this.query = this.query.find({...keyword});
        // console.log(this);

        return this;

    }


    filter() {
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);
        //removing some fields
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy);


        // filter for price and rating
        let qStr = JSON.stringify(queryCopy);

        qStr = qStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);


        this.query = this.query.find(JSON.parse(qStr));
        // console.log(qStr);

        return this;
    }


    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;

        const skipProducts = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skipProducts);

        return this;
    }
}


module.exports = ApiFeatures;