let difficult = 0,
  difficultParagraph = document.querySelector('#difficult'),
  easyBtn = document.querySelector('#easy'),
  hardBtn = document.querySelector('#hard'),
  ninjaBtn = document.querySelector('#ninja'),
  tamagochiName = document.querySelector('#tamagochiName'),
  myHappiness, myFood, myClean, myHP, mySoc, myMoney,
  tamagochiHappiness = document.querySelector('#tamagochiHappiness'),
  tamagochiFood = document.querySelector('#tamagochiFood'),
  tamagochiClean = document.querySelector('#tamagochiClean'),
  tamagochiHP = document.querySelector('#tamagochiHP'),
  tamagochiSoc = document.querySelector('#tamagochiSoc'),
  tamagochiMoney = document.querySelector('#tamagochiMoney'),
  time = 0;

// tamagichi's name
tamagochiName.innerHTML = prompt('Tamagochi\'s name');

easyBtn.addEventListener('click', function () {
  difficult = 0;
  difficultParagraph.innerHTML = 'Easy';
});

hardBtn.addEventListener('click', function () {
  difficult = 1;
  difficultParagraph.innerHTML = 'Hard';
});

ninjaBtn.addEventListener('click', function () {
  difficult = 2;
  difficultParagraph.innerHTML = 'Ninja';
});

//randomize stats
function randomizeStat(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

myHappiness = randomizeStat(50, 100);
myFood = randomizeStat(50, 100);
myClean = randomizeStat(50, 100);
myHP = randomizeStat(50, 200);
mySoc = randomizeStat(50, 100);
myMoney = randomizeStat(50, 200);

tamagochiHP.innerHTML = myHP;
tamagochiHappiness.innerHTML = myHappiness;
tamagochiFood.innerHTML = myFood;
tamagochiClean.innerHTML = myClean;
tamagochiSoc.innerHTML = mySoc;
tamagochiMoney.innerHTML = myMoney;

//Tamagochi Class
class Tamagochi {
  constructor(happiness, food, tamagochiClean, health, soc, money) {
    this.happiness = parseInt(happiness);
    this.food = parseInt(food);
    this.tamagochiClean = parseInt(tamagochiClean);
    this.health = parseInt(health);
    this.soc = parseInt(soc);
    this.money = parseInt(money);
  }

  decreaseStats() {
    if(difficult === 0) {
      this.happiness -= 3;
      this.food -= 3;
      this.tamagochiClean -= 3;
      this.health -= 3;
      this.soc -= 3;
      this.money -= 3;
    } else if(difficult === 1) {
      this.happiness -= 5;
      this.food -= 5;
      this.tamagochiClean -= 5;
      this.health -= 5;
      this.soc -= 5;
      this.money -= 5;
    }
  }

  decreaseStats1() {
    this.happiness -= 7;
    this.food -= 7;
    this.tamagochiClean -= 7;
    this.health -= 7;
    this.soc -= 7;
    this.money -= 7;
  }

  eat() {
    if(this.food >= 200) {
      this.tamagochiClean -= 20;
      this.health += 10;
    } else {
      this.food += 30;
      this.tamagochiClean -= 20;
      this.health += 10;
    }
  }

  wash() {
    if(this.tamagochiClean >= 200) {
      this.happiness -= 20;
    } else {
      this.happiness -= 20;
      this.tamagochiClean += 40;
    }
  }

  myRun() {
    if(this.happiness >= 200) {
      this.food -= 10;
      this.health -= 5;
    } else {
      this.happiness += 15;
      this.food -= 10;
      this.health -= 5;
    }
  }

  visitDoctor() {
    if(this.health >= 200) {
      this.money -= 20;
    } else {
      this.health += 30;
      this.money -= 20;
    }
  }

  goToBar() {
    if(this.soc >= 200) {
      if(this.food >= 200) {
        this.money -= 20;
        this.health -= 10;
      } else {
        this.food += 10;
        this.money -= 20;
        this.health -= 10;
      }
    } else {
      this.soc += 40;
      this.food += 10;
      this.money -= 20;
      this.health -= 10;
    }
  }

  goToWork() {
    this.money += 50;
    this.food -= 10;
    this.health -= 10;
    this.soc -= 20;
  }

  buyFood() {
    if(this.food >= 200) {
      this.money -= 20;
    } else {
      this.food += 20;
      this.money -= 20;
    }
  }

  startBusiness() {
    if(this.happiness >= 200) {
      if(this.soc >= 200) {
        this.money += 100;
        this.health -= 100;
      } else {
        this.money += 100;
        this.soc += 20;
        this.health -= 100;
      }
    } else {
      this.money += 100;
      this.soc += 20;
      this.happiness += 100;
      this.health -= 100;
    }
  }
}

//new Tamagochi
myTamagochi = new Tamagochi(tamagochiHappiness.innerHTML, tamagochiFood.innerHTML, tamagochiClean.innerHTML, tamagochiHP.innerHTML, tamagochiSoc.innerHTML, tamagochiMoney.innerHTML);
console.log(myTamagochi);

//Tamagochi's actions

(function() {
  time = 0;
  setInterval(function () {
    time += 0.001;
  }, 1)
})();

(function() {
  setInterval(function () {
    if(difficult === 0 || difficult === 1) {
      myTamagochi.decreaseStats();
    } else {
      myTamagochi.decreaseStats1();
    }
    tamagochiHP.innerHTML = myTamagochi.health;
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
    tamagochiFood.innerHTML = myTamagochi.food;
    tamagochiClean.innerHTML = myTamagochi.tamagochiClean;
    tamagochiSoc.innerHTML = myTamagochi.soc;
    tamagochiMoney.innerHTML = myTamagochi.money;
    if(myTamagochi.food <= 0 || myTamagochi.health <= 0) {
      alert('Oh no!!! Your Tamagochi is dead!!');
      alert('He lived ' + time.toFixed(3) + 's');
      location.reload();
      return 'dead'
    }
    if(myTamagochi.happiness <= 0 || myTamagochi.tamagochiClean <= 0 || myTamagochi.soc <= 0) {
      alert('Oh no!!! Your Tamagochi has ran away!!');
      alert('He lived ' + time.toFixed(3) + 's');
      location.reload();
      return 'ran away'
    }
    if(myTamagochi.money <= 0) {
      alert('Oh no!!! Your Tamagochi doesn\'t have money!!');
      alert('He lived ' + time.toFixed(3) + 's');
      location.reload();
      return 'doesn\'t have money'
    }

  }, 5000)
})();

document.querySelector('#eat').addEventListener('click', function () {
  myTamagochi.eat();
  if(myTamagochi.tamagochiClean <= 0) {
    alert('Oh no!!! Your Tamagochi has ran away!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'ran away'
  } else {
    tamagochiFood.innerHTML = myTamagochi.food;
    tamagochiClean.innerHTML = myTamagochi.tamagochiClean;
    tamagochiHP.innerHTML = myTamagochi.health;
  }
});

document.querySelector('#wash').addEventListener('click', function () {
  myTamagochi.wash();
  if(myTamagochi.happiness <= 0) {
    alert('Oh no!!! Your Tamagochi has ran away!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'ran away'
  } else {
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
    tamagochiClean.innerHTML = myTamagochi.tamagochiClean;
  }
});

document.querySelector('#run').addEventListener('click', function () {
  myTamagochi.myRun();
  if(myTamagochi.food <= 0 || myTamagochi.health <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'dead'
  } else {
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
    tamagochiFood.innerHTML = myTamagochi.food;
    tamagochiHP.innerHTML = myTamagochi.health;
  }
});

document.querySelector('#doctor').addEventListener('click', function () {
  myTamagochi.visitDoctor();
  if(myTamagochi.money <= 0) {
    alert('Oh no!!! Your Tamagochi doesn\'t have money!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'doesn\'t have money'
  } else {
    tamagochiHP.innerHTML = myTamagochi.health;
    tamagochiMoney.innerHTML = myTamagochi.money;
  }
});

document.querySelector('#bar').addEventListener('click', function () {
  myTamagochi.goToBar();
  if(myTamagochi.health <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'dead'
  } else if(myTamagochi.money <= 0) {
    alert('Oh no!!! Your Tamagochi doesn\'t have money!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'doesn\'t have money'
  } else {
    tamagochiHP.innerHTML = myTamagochi.health;
    tamagochiMoney.innerHTML = myTamagochi.money;
    tamagochiSoc.innerHTML = myTamagochi.soc;
    tamagochiFood.innerHTML = myTamagochi.food;
  }
});

document.querySelector('#work').addEventListener('click', function () {
  myTamagochi.goToWork();
  if(myTamagochi.food <= 0 || myTamagochi.health <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'dead'
  } else if(myTamagochi.soc <= 0) {
    alert('Oh no!!! Your Tamagochi has ran away!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'ran away'
  } else {
    tamagochiHP.innerHTML = myTamagochi.health;
    tamagochiMoney.innerHTML = myTamagochi.money;
    tamagochiSoc.innerHTML = myTamagochi.soc;
    tamagochiFood.innerHTML = myTamagochi.food;
  }
});

document.querySelector('#food').addEventListener('click', function () {
  myTamagochi.buyFood();
  if(myTamagochi.money <= 0) {
    alert('Oh no!!! Your Tamagochi doesn\'t have money!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'doesn\'t have money'
  } else {
    tamagochiMoney.innerHTML = myTamagochi.money;
    tamagochiFood.innerHTML = myTamagochi.food;
  }
});

document.querySelector('#business').addEventListener('click', function () {
  myTamagochi.startBusiness();
  if(myTamagochi.health <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
    return 'dead'
  } else {
    tamagochiMoney.innerHTML = myTamagochi.money;
    tamagochiSoc.innerHTML = myTamagochi.soc;
    tamagochiHP.innerHTML = myTamagochi.health;
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
  }
});
