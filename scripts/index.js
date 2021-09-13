const LOTTERY_BALLS = 40;
const MAX_SELECTED_BALLS = 7;
const CORRECT_NUMS = 7;

let balls = [];
let selectedBalls = [];

const ball = {
  id: 0,
  isSelected: false,
  element: null,
};

const footerElement = document.getElementById("footer");
const ballDivElement = document.getElementById("ball-container");

const getBallFromList = (target) => {
  for (let ballToSearch of balls) {
    if (ballToSearch.id === Number(target.id)) return ballToSearch;
  }
  return null;
};
const updateBallDivElement = (clickedBall) => {
  if (clickedBall.isSelected) {
    clickedBall.element.classList.add("ball-selected");
    clickedBall.element.classList.remove("ball-unselected");
    selectedBalls.push(clickedBall);
    createFooterBall(clickedBall);
    if (selectedBalls.length == MAX_SELECTED_BALLS) initGame();
  } else {
    clickedBall.element.classList.remove("ball-selected");
    clickedBall.element.classList.add("ball-unselected");
    if (selectedBalls.length > 0) {
      const indexToRemove = selectedBalls.findIndex((el) => {
        return el == clickedBall;
      });
      selectedBalls.splice(indexToRemove, 1);
      resetFooter();
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
    updateBallDivElement(ballClickedObject);
  }
};

const lotteryBallDiv = () => {
  const _newLotteryBallDiv = document.createElement("div");
  _newLotteryBallDiv.classList.add("ball-unselected");
  _newLotteryBallDiv.onclick = onClick;

  return _newLotteryBallDiv;
};

const createBallDivElements = () => {
  for (let i = 1; i <= LOTTERY_BALLS; i++) {
    const newLotteryBallDiv = lotteryBallDiv();
    newLotteryBallDiv.setAttribute("id", `${i}`);

    let newBall = { id: i, isSelected: false, element: newLotteryBallDiv };
    balls.push(newBall);

    const newLotteryBallNumber = document.createElement("p");
    newLotteryBallNumber.classList.add("ball-text");
    newLotteryBallNumber.textContent = i;

    newLotteryBallDiv.appendChild(newLotteryBallNumber);

    const currentDiv = document.getElementById("ball-container");
    currentDiv.appendChild(newLotteryBallDiv);
  }
};

const selectedBallNumbers = () => {
  let numbers = [];
  selectedBalls.forEach((ball) => {
    numbers.push(ball.id);
  });
  return numbers;
};

const updateFooterBalls = () => {
  // TODO: Sort the array based on ID
  selectedBalls.forEach((ball) => {
    createFooterBall(ball);
  });
};
const createFooterBall = (ball) => {
  const newFooterBall = ball.element.cloneNode(true);
  footerElement.appendChild(newFooterBall);
};
const resetFooter = () => {
  footerElement.innerHTML = "";
  updateFooterBalls();
};

const initGame = () => {
  const lotteryGame = new Lottery(
    selectedBallNumbers(),
    LOTTERY_BALLS,
    CORRECT_NUMS
  );
  lotteryGame.initGame();
};

createBallDivElements();
