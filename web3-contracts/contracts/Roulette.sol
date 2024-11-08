pragma solidity ^0.8.20;

contract Roulette {
  
  uint betAmount;
  uint necessaryBalance;
  uint nextRoundTimestamp;
  address creator;
  uint256 maxAmountAllowedInTheBank;
  mapping (address => uint256) winnings;
  uint8[] payouts;
  uint8[] numberRange;

  
  /*
    BetTypes are as follow:
      0: color
      1: column
      2: dozen
      3: eighteen
      4: modulus
      5: number
      
    Depending on the BetType, number will be:
      color: 0 for black, 1 for red
      column: 0 for left, 1 for middle, 2 for right
      dozen: 0 for first, 1 for second, 2 for third
      eighteen: 0 for low, 1 for high
      modulus: 0 for even, 1 for odd
      number: number
  */
  
  struct Bet {
    address player;
    uint8 betType;
    uint8 number;
  }
  Bet[] public bets;
  constructor() public payable {
    creator = msg.sender;
    necessaryBalance = 0;
    nextRoundTimestamp = block.timestamp;
    payouts = [2,3,3,2,2,36];
    numberRange = [1,2,2,1,1,36];
    betAmount = 10000000000000000;
    maxAmountAllowedInTheBank = 2000000000000000000;
  }
  event RandomNumber(uint256 number);
  
  function getStatus() public view returns(uint, uint, uint, uint, uint) {
    return (
      bets.length,             // number of active bets
      bets.length * betAmount, // value of active bets
      nextRoundTimestamp,      // when can we play again
      address(this).balance,   // roulette balance
      winnings[msg.sender]     // winnings of player
    ); 
  }
    
  function addEther() payable public {}

  function bet(uint8 number, uint8 betType) payable public {
    /* 
       A bet is valid when:
       1 - the value of the bet is correct (=betAmount)
       2 - betType is known (between 0 and 5)
       3 - the option betted is valid (don't bet on 37!)
       4 - the bank has sufficient funds to pay the bet
    */
    require(msg.value == betAmount);                             
    require(betType >= 0 && betType <= 5);                        
    require(number >= 0 && number <= numberRange[betType]);        
    uint payoutForThisBet = payouts[betType] * msg.value;
    uint provisionalBalance = necessaryBalance + payoutForThisBet;
    require(provisionalBalance < address(this).balance);           
    /* we are good to go */
    necessaryBalance += payoutForThisBet;
    bets.push(Bet({
      betType: betType,
      player: msg.sender,
      number: number
    }));
  }

  function spinWheel() public {
    require(bets.length > 0);
    require(block.timestamp > nextRoundTimestamp);
    nextRoundTimestamp = block.timestamp;
    uint diff = block.difficulty;
    bytes32 hash = blockhash(block.number-1);
    Bet memory lb = bets[bets.length-1];
    uint number = uint(keccak256(abi.encodePacked(block.timestamp, diff, hash, lb.betType, lb.player, lb.number))) % 37;

    for (uint i = 0; i < bets.length; i++) {
      bool won = false;
      Bet memory b = bets[i];
      if (number == 0) {
        won = (b.betType == 5 && b.number == 0);                 
      } else {
        if (b.betType == 5) { 
          won = (b.number == number);                              
        } else if (b.betType == 4) {
          if (b.number == 0) won = (number % 2 == 0);            
          if (b.number == 1) won = (number % 2 == 1);             
        } else if (b.betType == 3) {            
          if (b.number == 0) won = (number <= 18);                
          if (b.number == 1) won = (number >= 19);                 
        } else if (b.betType == 2) {                               
          if (b.number == 0) won = (number <= 12);                 
          if (b.number == 1) won = (number > 12 && number <= 24);  
          if (b.number == 2) won = (number > 24);               
        } else if (b.betType == 1) {               
          if (b.number == 0) won = (number % 3 == 1);              /* bet on left column */
          if (b.number == 1) won = (number % 3 == 2);              /* bet on middle column */
          if (b.number == 2) won = (number % 3 == 0);              /* bet on right column */
        } else if (b.betType == 0) {
          if (b.number == 0) {                                     /* bet on black */
            if (number <= 10 || (number >= 20 && number <= 28)) {
              won = (number % 2 == 0);
            } else {
              won = (number % 2 == 1);
            }
          } else {                                                 /* bet on red */
            if (number <= 10 || (number >= 20 && number <= 28)) {
              won = (number % 2 == 1);
            } else {
              won = (number % 2 == 0);
            }
          }
        }
      }
      if (won) {
        winnings[b.player] += betAmount * payouts[b.betType];
      }
    }
    necessaryBalance = 0;
    if (address(this).balance > maxAmountAllowedInTheBank) takeProfits();
    emit RandomNumber(number);
  }
  
  function cashOut() external payable {
    address payable player = payable(msg.sender);
    uint256 amount = winnings[player];
    require(amount > 0);
    require(amount <= address(this).balance);
    winnings[player] = 0;
    bool status = player.send(amount);
    require(status, "Failed to send Ether");
  }
  
  function takeProfits() public payable {
    uint amount = address(this).balance - maxAmountAllowedInTheBank;
    if (amount > 0)   {
      bool status= payable(creator).send(amount);
      require(status, "Failed to send Ether");
    }
  }
  
  function creatorKill() public {
    require(msg.sender == creator);
    selfdestruct(payable(creator));
  }
 
}