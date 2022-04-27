const check = require('../lib/checklib');

let paginationWithFromTo = (searchParameter, fromParameter, toParameter) => {
    let search = check.isEmpty(searchParameter) ? "" : searchParameter;
    let from = check.isEmpty(fromParameter) ? 1 : fromParameter;
    let to = check.isEmpty(toParameter) ? 10 : toParameter;
    let pageSize = Number((to - from) + 1);
    console.log("pageSize+++++++++++++++++++++",pageSize)
    let offset = Number(from - 1);
    console.log("offset+++++++++++++++++++++",offset)
    return { search, offset, pageSize };
}

module.exports = {
    paginationWithFromTo: paginationWithFromTo,
}