/*
Helper function to take ugly text from player stats and return a dictionary in the following format:
{
original: “games_played”,
abbrev: “GP”,
pretty: “Games Played”
}
Takes 1 string as an argument.
*/
export default function prettifyText(text){
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
//prettyText("bebe_popo_ATT_pat");
