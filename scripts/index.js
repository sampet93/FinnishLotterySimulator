const LOTTERY_BALLS = 40;
const MAX_SELECTED_BALLS = 7;

let balls = [];
let selectedBalls = [];

const ball = {
  id: 0,
  isSelected: false,
  element: null,
};

const getBallFromList = (target) => {
  for (let ballToSearch of balls) {
    if (ballToSearch.id === Number(target.id)) return ballToSearch;
  }
  return null;
};
const updateElement = (clickedBall) => {
  if (clickedBall.isSelected) {
    clickedBall.element.classList.add("ball-selected");
    clickedBall.element.classList.remove("ball-unselected");
    selectedBalls.push(clickedBall);
  } else {
    clickedBall.element.classList.remove("ball-selected");
    clickedBall.element.classList.add("ball-unselected");
    if (selectedBalls.length > 0) {
      const indexToRemove = selectedBalls.findIndex((el) => {
        return el == clickedBall;
      });
      selectedBalls.splice(indexToRemove, 1);
    }
  }
};
const onClick = (e) => {
  let ballClickedObject = getBallFromList(e.target);
  if (
    ballClickedObject !== null &&
    !ballClickedObject.isSelected &&
    selectedBalls.length >= MAX_SELECTED_BALLS
  )
    return;
  else if (ballClickedObject !== null) {
    ballClickedObject.isSelected
      ? (ballClickedObject.isSelected = false)
      : (ballClickedObject.isSelected = true);
    updateElement(ballClickedObject);
  }
};

const lotteryBallDiv = () => {
  const _newLotteryBallDiv = document.createElement("div");
  _newLotteryBallDiv.classList.add("ball-unselected");
  _newLotteryBallDiv.onclick = onClick;

  return _newLotteryBallDiv;
};

const createElements = () => {
  for (let i = 1; i <= LOTTERY_BALLS; i++) {
    const newLotteryBallDiv = lotteryBallDiv();
    newLotteryBallDiv.setAttribute("id", `${i}`);

    let newBall = { id: i, isSelected: false, element: newLotteryBallDiv };
    balls.push(newBall);

    const newLotteryBallNumber = document.createElement("p");
    newLotteryBallNumber.classList.add("ball-text");
    newLotteryBallNumber.textContent = i;

    newLotteryBallDiv.appendChild(newLotteryBallNumber);

    const currentDiv = document.getElementById("ballContainer");
    currentDiv.appendChild(newLotteryBallDiv);
  }
};

createElements();
