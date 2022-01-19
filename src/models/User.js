class User {
    constructor(uid, first, last, institution) {
        this.uid = uid;
        this.first = first;
        this.last = last;
        this.institution = institution;
    }

    static fromJson(json) {
        let meta = json['meta'];
        return new User(
            json['uid'],
            meta['first'],
            meta['last'],
            meta['institution']
        );
    }
}

export default User;
