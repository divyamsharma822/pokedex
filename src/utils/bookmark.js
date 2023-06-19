const bookmark = ( val ) => {
    if(sessionStorage.getItem("bkArray")){
        let bkArray = JSON.parse(sessionStorage.getItem("bkArray"));
        let tmp = [];

        if(bkArray.find((curr) =>  curr === val)){
            bkArray.forEach(element => {
                if(element !== val){
                    tmp.push(element);
                }
            });
            sessionStorage.setItem("bkArray",JSON.stringify(tmp));
        }
        else{
            bkArray.push(val);
            sessionStorage.setItem("bkArray",JSON.stringify(bkArray));
        }

    }else{
        sessionStorage.setItem("bkArray",JSON.stringify([val]));
    }
}

const bookmarked = (id) => {
    let arr = JSON.parse(sessionStorage.getItem("bkArray"));
    if(arr){
        return arr.find((curr) => curr === id) ? true : false;
    }else{
        return false;
    }
}

export { bookmark , bookmarked };