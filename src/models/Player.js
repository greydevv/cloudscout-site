class BasePlayer {
    constructor(pid, first, last, institution, division, timestamp) {
        this.pid = pid;
        this.first = first;
        this.last = last;
        this.institution = institution;
        this.division = division;
        this.timestamp = timestamp;
    }

    static fromJson(json) {
        let meta = json['meta'];
        return new BasePlayer(
            json['pid'],
            meta['first'],
            meta['last'],
            meta['institution'],
            meta['division'],
            meta['date']
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
                this.timestamp
            ];
        }
        return [
            // this.pid, 
            this.capitalize(this.first), 
            this.capitalize(this.last), 
            this.institution, 
            this.division,
            this.timestamp
        ];
    }
}

export default BasePlayer;
