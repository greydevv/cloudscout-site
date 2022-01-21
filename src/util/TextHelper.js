/*
Helper function to take ugly text from player stats and return a dictionary in the following format:
{
original: “games_played”,
abbrev: “GP”,
pretty: “Games Played”
}
Takes 1 string as an argument.
*/
function prettyText(text){
    const textList = text.toLowerCase().split("_");
    pretty = [];
    abbr = [];
    textList.forEach(
        (word) => {
            firstChar = word.charAt(0).toUpperCase();
            word = firstChar + word.slice(1);
            abbr.push(firstChar);
            pretty.push(word);
        }
    );
    prettyText = pretty.join(" ");
    abbrText = abbr.join("");
    return {
        original: text,
        abbrev: abbrText,
        pretty: prettyText
    };
}
//prettyText("bebe_popo_ATT_pat");
