var DeathMatch = class DeathMatch {
    //arguments = 'team-1-name', 'team-2-name' / not array
    static draw() {
        [0, 1].forEach(idx => {this.updateTeamName(idx, arguments[idx])})
    }

    //which = 0 || 1;
    static updateTeamScore(which, score) {
        document.querySelectorAll('.dm-team-score')[which].innerHTML = score;
    }

    static updateTeamName(which, name) {
        document.querySelectorAll('.dm-team-name')[which].innerHTML = name;
    }
}