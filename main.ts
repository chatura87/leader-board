let roundArray: { round: number, pair?: number, p1: string, p2: string, bgColor: string }[] = [];


function createRounds(list: string[]) {
    let pairCount = 0;
    const rounds = Math.ceil(Math.sqrt(list.length));
    //number of rounds
    for (let i = 0; i < rounds; i++) {
        ++pairCount;
        const bgColor = '#' + Math.floor(Math.random() * 16777215).toString(16)
        // number of pairs per round
        for (let j = 0; j < Math.ceil(list.length / (pairCount * 2)); j++) {
            roundArray.push({round: i, pair: j, p1: '', p2: '', bgColor});
        }
    }
}

function createElements(player1: string, player2: string, id: number | string, element: HTMLElement, round = 0, backgroundColor?: string) {
    if (round === 0) {
        element.setAttribute('id', id + '');
    }
    element.innerHTML += `<div style="background-color: ${backgroundColor || 'green'}; color: white;margin-top: 8px;">${player1}<input style="float: right" type="checkbox" id="myCheck" onclick="setWinner(${round},'${player1}')"></div>
                            <div style="background-color: ${backgroundColor || 'green'}; color: white;">${player2}<input style="float: right" type="checkbox" id="myCheck" onclick="setWinner(${round},'${player2}')"></div>`;
}


export function createNodes(value: string) {
    let list = value.split(',').filter(Boolean);
    let pair = 0;
    // get the main element
    const main = document.getElementById('main');
    main.innerHTML = '';
    //set up the child div in the main container
    const el = document.createElement('div');
    el.className = 'node';

    list = shuffle(list);
    createRounds(list);

    for (let i = 0; i < list.length; i += 2) {
        // fill the current round with players
        let currentRound = roundArray.filter(roundInList => roundInList.round === 0 && roundInList.pair === pair)[0];
        currentRound.p1 = list[i];
        currentRound.p2 = list[i + 1];
        pair++;

        //create the html element
        createElements(list[i], list[i + 1], i, el);
    }
    main.appendChild(el);
}

function shuffle(array: string[]): string[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    if (array.length % 2 !== 0) {
        array.push('---');
    }
    return array;
}

function createNextRoundContainer(nextRound: { round: number; pair?: number; p1: string; p2: string }) {
    let nextRoundContainer = document.getElementById('round' + nextRound.round);
    if (!nextRoundContainer) {
        nextRoundContainer = document.createElement('div');
        nextRoundContainer.setAttribute('id', 'round' + nextRound.round);
    }
    return nextRoundContainer;
}

function createNextRoundDom(nextRound: { round: number; pair?: number; p1: string; p2: string }) {
    let roundDom = document.getElementById('' + nextRound.round + nextRound.pair);
    if (roundDom) {
        roundDom.innerHTML = '';
    } else {
        roundDom = document.createElement('div');
        roundDom.setAttribute('id', '' + nextRound.round + nextRound.pair);
        roundDom.className = 'node';
    }
    return roundDom;
}

export function setWinner(round: number, winner: string) {
    const main = document.getElementById('main');
    const [nextRound] = roundArray.filter((roundInList) => {
            return roundInList.round === (round + 1) && (!roundInList.p1 || !roundInList.p2)
        }
    );

    !nextRound?.p1 ? nextRound.p1 = winner : nextRound.p2 = winner;
    let nextRoundContainer = createNextRoundContainer(nextRound);
    let roundDom = createNextRoundDom(nextRound);


    createElements(nextRound.p1, nextRound.p2, 'round' + nextRound.round, roundDom, round + 1, nextRound.bgColor);
    nextRoundContainer.appendChild(roundDom);
    main.appendChild(nextRoundContainer);
}

export function showCreateTemplate() {
    const dashboard = document.getElementById('dashboard');
    const winner = document.getElementById('winner');
    const crete = document.getElementById('create');
    winner.style.display = 'none';
    dashboard.style.display = 'none';
    crete.style.display = 'block';
}


// TODO: improvement
export function showWinnerTemplate() {
    const dashboard = document.getElementById('dashboard');
    const create = document.getElementById('create');
    const winner = document.getElementById('winner');
    create.style.display = 'none';
    dashboard.style.display = 'none';
    winner.style.display = 'block';
}

// TODO: improvement
export function showDashboard() {
    const create = document.getElementById('create');
    const winner = document.getElementById('winner');
    const dashboard = document.getElementById('dashboard');
    winner.style.display = 'none';
    create.style.display = 'none';
    dashboard.style.display = 'block';

}

setTimeout(() => {
    showCreateTemplate();
}, 10)
