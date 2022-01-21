// export class FootballPlayer extends BasePlayer {
//     constructor(
//         pid, 
//         first, 
//         last, 
//         institution, 
//         division, 
//         timestamp, 
//         position, 
//         schoolClass, 
//         sport
//     ) {
//         super(pid, first, last, institution, division, timestamp, position, schoolClass, sport);
//     }
// }

export default class BasePlayer {
    constructor(pid, first, last, institution, division, timestamp, position, schoolClass, sport) {
        this.pid = pid;
        this.first = first;
        this.last = last;
        this.institution = institution;
        this.division = division;
        this.timestamp = timestamp;
        if (position === null) {
            this.position = '-';
        } else {
            this.position = position;
        }
        if (schoolClass === null) {
            // need to display something else here
            this.schoolClass = '-';
        } else {
            this.schoolClass = ['FR', 'SO', 'JR', 'SR', 'GR'][schoolClass-1];
        }
        this.sport = sport;
    }

    static fromJson(json) {
        let meta = json['meta'];
        return new BasePlayer(
            json['pid'],
            meta['first'],
            meta['last'],
            meta['institution'],
            meta['division'],
            meta['date'],
            meta['position'],
            meta['class'],
            meta['sport']
        );
    }

    getFullName() {
        return `${this.capitalize(this.first)} ${this.capitalize(this.last)}`;
    }

    getFormattedDate() {
        const dtFormat = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeZone: 'EST'
        });
        let dateObj = dtFormat.format(new Date(this.timestamp * 1000));
        return dateObj;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    toArray(concatName) {
        if (concatName === true) {
            return [
                this.getFullName(),
                this.institution,
                this.division,
                this.timestamp,
                this.position,
                this.schoolClass
            ];
        }
        return [
            // this.pid,
            this.capitalize(this.first),
            this.capitalize(this.last),
            this.institution,
            this.division,
            this.timestamp,
            this.position,
            this.schoolClass
        ];
    }
}
