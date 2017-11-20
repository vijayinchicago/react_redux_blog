
export const sort = (obj, property, lowestFirst) => {

    if (lowestFirst) {
        obj.sort((a,b) => {
            if (a[property] < b[property])
                return -1;
            if (a[property] > b[property])
                return 1;
            return 0;
        })
    } else {
        obj.sort((a,b) => {
            if (a[property] > b[property])
                return -1;
            if (a[property] < b[property])
                return 1;
            return 0;
        })
    }
    
    return obj
}