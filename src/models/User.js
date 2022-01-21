class User {
    constructor(uid, first, last, institution, favorites) {
        this.uid = uid;
        this.first = first;
        this.last = last;
        this.institution = institution;
        this.favorites = favorites;
    }

    static fromJson(json) {
        let meta = json['meta'];
        let account = json['account'];
        return new User(
            json['uid'],
            meta['first'],
            meta['last'],
            meta['institution'],
            account['favorites']
        );
    }

    toJson(json) {
        return JSON.stringify({
            uid: this.uid,
            meta: {
                first: this.first,
                last: this.last,
                institution: this.institution
            },
            account: {
                favorites: this.favorites
            }
        });
    }
}

export default User;
