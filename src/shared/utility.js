export const updatedObject =(oldObject,updatedProperties)=> {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidatity=(value,rules)=>{
    let isValid=true;

    if(!rules){
        return true
    }
    if(rules.required){
        isValid =value!==''
    }
    if(rules.pattern){
        const patt =/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        isValid=patt.test(value) && isValid
    }
    if(rules.minLength){
        isValid = value.length>=5 && isValid;
    }
    if(rules.maxLength){
        isValid = value.length<=5 && isValid;
    }
    return isValid;
}

export const consoleStatementsRemover = () => {console.log = function() {}}