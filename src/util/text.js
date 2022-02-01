export function prettifyText(text){
    const textList = text.toLowerCase().split("_");
    var pretty = [];
    var abbr = [];
    textList.forEach(
        (word) => {
            var firstChar = word.charAt(0).toUpperCase();
            word = firstChar + word.slice(1);
            abbr.push(firstChar);
            pretty.push(word);
        }
    );
    let prettyText = pretty.join(" ");
    var abbrText = abbr.join("");
    return {
        original: text,
        abbrev: abbrText,
        pretty: prettyText
    };
}

export function classNumToString(classNum) {
    const classes = {1: 'FR', 2: 'SO', 3: 'JR', 4: 'SR', 5: 'GR'};
    return classes[classNum];
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getFullName(first, last) {
    return `${capitalize(first)} ${capitalize(last)}`;
}

export function formatDate(timestamp) {
    const dtFormat = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeZone: 'UTC'
    });
    let dateObj = dtFormat.format(new Date(timestamp * 1000))

    return dateObj;
}

export function isInteger(string) {
    return /^-?[0-9]+$/.test(string);
}
