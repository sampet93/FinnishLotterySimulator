class Lottery {
  constructor(lotteryNumbers, maxNumber, correctNumbersToStop) {
    this.lotteryNumbers = lotteryNumbers;
    this.maxNumber = maxNumber;
    this.correctNumbersToStop = correctNumbersToStop;
    this.newLotteryNumbers = [];
    this.lotteryRound = 0;
  }

  getRandomLotteryNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max + 1); // Add 1 as maximum is exclusive
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  drawNewLotteryNumbers = () => {
    this.newLotteryNumbers = [];
    let newNumber;
    while (this.newLotteryNumbers.length < 7) {
      do {
        newNumber = this.getRandomLotteryNumber(1, this.maxNumber);
      } while (this.newLotteryNumbers.includes(newNumber));
      this.newLotteryNumbers.push(newNumber);
    }
  };

  startLottery = () => {
    let correct = 0;
    while (correct < this.correctNumbersToStop) {
      this.drawNewLotteryNumbers();
      this.lotteryRound += 1;
      correct = 0;
      for (let x = 0; x < this.lotteryNumbers.length; x++) {
        for (let y = 0; y < this.newLotteryNumbers.length; y++) {
          correct +=
            this.lotteryNumbers[x] == this.newLotteryNumbers[y] ? 1 : 0;
        }
      }
      if (correct == 6) console.log("Found 6!");
    }
    console.log("WIN on round: " + this.lotteryRound);
  };

  initGame = () => {
    this.startLottery();
  };
}
