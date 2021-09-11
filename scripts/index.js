const LOTTERY_BALLS = 40;

let balls = [];
let selectedBalls = [];

const ball = {
    id: 0,
    isSelected: false,
    element: null
}

const getBallFromList = target => {
    for(let ballToSearch of balls) {
        if(ballToSearch.id === Number(target.id)) return ballToSearch;
    }
    return null;
}
const updateElement = clickedBall => {
    if(clickedBall.isSelected){
        clickedBall.element.classList.add("ball-selected");
        clickedBall.element.classList.remove("ball-unselected");
    } else {
        clickedBall.element.classList.remove("ball-selected");
        clickedBall.element.classList.add("ball-unselected");
    }
}
const onClick = (e) => {
    let ballClickedObject = getBallFromList(e.target);
    if(ballClickedObject !== null){
        ballClickedObject.isSelected ? ballClickedObject.isSelected = false : ballClickedObject.isSelected = true;
        updateElement(ballClickedObject);
    }
}

const lotteryBallDiv = () => {
    const _newLotteryBallDiv = document.createElement("div");
    _newLotteryBallDiv.classList.add("ball-unselected");
    _newLotteryBallDiv.onclick = onClick;

    return _newLotteryBallDiv;
}

const createElements = () => {
    for(let i = 1; i <= LOTTERY_BALLS; i++){

        const newLotteryBallDiv = lotteryBallDiv();
        newLotteryBallDiv.setAttribute("id", `${i}`);

        let newBall = new Object();
        newBall.id = i;
        newBall.isSelected = false;
        newBall.element = newLotteryBallDiv;
        balls.push(newBall);


        const newLotteryBallNumber = document.createElement("p");
        newLotteryBallNumber.textContent = i;
    
        newLotteryBallDiv.appendChild(newLotteryBallNumber);
    
        const currentDiv = document.getElementById("ballContainer");
        currentDiv.appendChild(newLotteryBallDiv);
    }
}

createElements();


