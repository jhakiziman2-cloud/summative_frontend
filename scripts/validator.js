// this is to avoid trailing spaces
var titleRule = /^\S(?:.*\S)?$/;
// whole number or number with 2 decimal places
var numberRule = /^(0|[1-9]\d*)(\.d{1,2})?$/;
// date
var dateRule = /^\d{4}-(0[1-9]|[0-2])-(0[1-9]|[12]\d|3[01])$/;
// fhis is for tags
var tagRule = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
// this is for finding repeated words e.g "it it"
var duplicateWordRule = /\b(\w+)\s+\1\b/i;

function checkTitle(value) {
    if(!titleRule.test(value)) {
        return "Title is required and cannot start or end with a space";
    }
    if(duplicateWordRule.test(value)) {
        return "Title has a repeated word (like 'the the'). Please fix it.";
    }
    return "";
}

function checkDuration(value) {
    if (!numberRule.test(value)) {
        return "Enter a number like 10 or 1.7";
    }
    return "";
}

function checkDate(value) {
    if (!dateRule.test(value)) {
        return "Use the format YYYY-MM-DD";
    }
    return "";
}

function checkTag(value) {
    if (!tagRule.test(value)) {
        return "Tag can only have letters, spaces and hyphens";
    }
    return "";
}

// used when importing JSON
function checkRecord(r) {
    if (typeof r !=="object" || r === null) return false;
    if (typeof r.id !== "string") return false;
    if (typeof r.title !== "string" || checkTitle(r.title) !== "") return false;
    if (typeof r.duration !== "number") return false;
    if (typeof r.tag !== "string" || checkTag(r.tag) !== "") return false;
    if (typeof r.dueDate !== "string" || checkDate(r.dueDate) !=="") return false;
    return true; 
}