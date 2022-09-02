"use strict";
exports.__esModule = true;
exports.showDashboard = exports.showWinnerTemplate = exports.showCreateTemplate = exports.setWinner = exports.createNodes = void 0;
var roundArray = [];
function createRounds(list) {
    var pairCount = 0;
    var rounds = Math.ceil(Math.sqrt(list.length));
    //number of rounds
    for (var i = 0; i < rounds; i++) {
        ++pairCount;
        var bgColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        // number of pairs per round
        for (var j = 0; j < Math.ceil(list.length / (pairCount * 2)); j++) {
            roundArray.push({ round: i, pair: j, p1: '', p2: '', bgColor: bgColor });
        }
    }
}
function createElements(player1, player2, id, element, round, backgroundColor) {
    if (round === void 0) { round = 0; }
    if (round === 0) {
        element.setAttribute('id', id + '');
    }
    element.innerHTML += "<div style=\"background-color: ".concat(backgroundColor || 'green', "; color: white;margin-top: 8px;\">").concat(player1, "<input style=\"float: right\" type=\"checkbox\" id=\"myCheck\" onclick=\"setWinner(").concat(round, ",'").concat(player1, "')\"></div>\n                            <div style=\"background-color: ").concat(backgroundColor || 'green', "; color: white;\">").concat(player2, "<input style=\"float: right\" type=\"checkbox\" id=\"myCheck\" onclick=\"setWinner(").concat(round, ",'").concat(player2, "')\"></div>");
}
function createNodes(value) {
    var list = value.split(',').filter(Boolean);
    var pair = 0;
    // get the main element
    var main = document.getElementById('main');
    main.innerHTML = '';
    //set up the child div in the main container
    var el = document.createElement('div');
    el.className = 'node';
    list = shuffle(list);
    createRounds(list);
    for (var i = 0; i < list.length; i += 2) {
        // fill the current round with players
        var currentRound = roundArray.filter(function (roundInList) { return roundInList.round === 0 && roundInList.pair === pair; })[0];
        currentRound.p1 = list[i];
        currentRound.p2 = list[i + 1];
        pair++;
        //create the html element
        createElements(list[i], list[i + 1], i, el);
    }
    main.appendChild(el);
}
exports.createNodes = createNodes;
function shuffle(array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex], array[currentIndex]
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    if (array.length % 2 !== 0) {
        array.push('---');
    }
    return array;
}
function createNextRoundContainer(nextRound) {
    var nextRoundContainer = document.getElementById('round' + nextRound.round);
    if (!nextRoundContainer) {
        nextRoundContainer = document.createElement('div');
        nextRoundContainer.setAttribute('id', 'round' + nextRound.round);
    }
    return nextRoundContainer;
}
function createNextRoundDom(nextRound) {
    var roundDom = document.getElementById('' + nextRound.round + nextRound.pair);
    if (roundDom) {
        roundDom.innerHTML = '';
    }
    else {
        roundDom = document.createElement('div');
        roundDom.setAttribute('id', '' + nextRound.round + nextRound.pair);
        roundDom.className = 'node';
    }
    return roundDom;
}
function setWinner(round, winner) {
    var main = document.getElementById('main');
    var nextRound = roundArray.filter(function (roundInList) {
        return roundInList.round === (round + 1) && (!roundInList.p1 || !roundInList.p2);
    })[0];
    !(nextRound === null || nextRound === void 0 ? void 0 : nextRound.p1) ? nextRound.p1 = winner : nextRound.p2 = winner;
    var nextRoundContainer = createNextRoundContainer(nextRound);
    var roundDom = createNextRoundDom(nextRound);
    createElements(nextRound.p1, nextRound.p2, 'round' + nextRound.round, roundDom, round + 1, nextRound.bgColor);
    nextRoundContainer.appendChild(roundDom);
    main.appendChild(nextRoundContainer);
}
exports.setWinner = setWinner;
function showCreateTemplate() {
    var dashboard = document.getElementById('dashboard');
    var winner = document.getElementById('winner');
    var crete = document.getElementById('create');
    winner.style.display = 'none';
    dashboard.style.display = 'none';
    crete.style.display = 'block';
}
exports.showCreateTemplate = showCreateTemplate;
// TODO: improvement
function showWinnerTemplate() {
    var dashboard = document.getElementById('dashboard');
    var create = document.getElementById('create');
    var winner = document.getElementById('winner');
    create.style.display = 'none';
    dashboard.style.display = 'none';
    winner.style.display = 'block';
}
exports.showWinnerTemplate = showWinnerTemplate;
// TODO: improvement
function showDashboard() {
    var create = document.getElementById('create');
    var winner = document.getElementById('winner');
    var dashboard = document.getElementById('dashboard');
    winner.style.display = 'none';
    create.style.display = 'none';
    dashboard.style.display = 'block';
}
exports.showDashboard = showDashboard;
setTimeout(function () {
    showCreateTemplate();
}, 10);
