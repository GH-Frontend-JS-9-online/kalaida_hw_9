let difficult = 0,
  difficultParagraph = document.querySelector('#difficult'),
  easyBtn = document.querySelector('#easy'),
  hardBtn = document.querySelector('#hard'),
  tamagochiName = document.querySelector('#tamagochiName'),
  myHappiness, myFood, myClean,
  tamagochiHappiness = document.querySelector('#tamagochiHappiness'),
  tamagochiFood = document.querySelector('#tamagochiFood'),
  tamagochiClean = document.querySelector('#tamagochiClean'),
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

//randomize stats
function randomizeStat(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if(difficult === 0) {
  myHappiness = randomizeStat(50, 100);
  myFood = randomizeStat(50, 100);
  myClean = randomizeStat(50, 100);
} else {
  myHappiness = randomizeStat(50, 70);
  myFood = randomizeStat(50, 70);
  myClean = randomizeStat(50, 70);
}

tamagochiHappiness.innerHTML = myHappiness;
tamagochiFood.innerHTML = myFood;
tamagochiClean.innerHTML = myClean;

//Tamagochi Class
class Tamagochi {
  constructor(happiness, food, tamagochiClean) {
    this.happiness = parseInt(happiness);
    this.food = parseInt(food);
    this.tamagochiClean = parseInt(tamagochiClean);
  }

  decreaseStats() {
    if(difficult === 0) {
      this.happiness -= 3;
      this.food -= 3;
      this.tamagochiClean -= 3;
    } else {
      this.happiness -= 5;
      this.food -= 5;
      this.tamagochiClean -= 5;
    }
  }

  eat() {
    if(this.food >= 200) {
      this.tamagochiClean -= 20;
    } else {
      this.food += 30;
      this.tamagochiClean -= 20;
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
    } else {
      this.happiness += 15;
      this.food -= 10;
    }
  }
}

//new Tamagochi
myTamagochi = new Tamagochi(tamagochiHappiness.innerHTML, tamagochiFood.innerHTML, tamagochiClean.innerHTML);
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
    myTamagochi.decreaseStats();
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
    tamagochiFood.innerHTML = myTamagochi.food;
    tamagochiClean.innerHTML = myTamagochi.tamagochiClean;
    if(myTamagochi.happiness < 0 || myTamagochi.food < 0 || myTamagochi.tamagochiClean < 0) {
      alert('Oh no!!! Your Tamagochi is dead!!');
      alert('He lived ' + time.toFixed(3) + 's');
      location.reload();
    }
  }, 5000)
})();

document.querySelector('#eat').addEventListener('click', function () {
  myTamagochi.eat();
  if(myTamagochi.food <= 0 || myTamagochi.tamagochiClean <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
  } else {
    tamagochiFood.innerHTML = myTamagochi.food;
    tamagochiClean.innerHTML = myTamagochi.tamagochiClean;
  }
});

document.querySelector('#wash').addEventListener('click', function () {
  myTamagochi.wash();
  if(myTamagochi.happiness <= 0 || myTamagochi.tamagochiClean <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
  } else {
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
    tamagochiClean.innerHTML = myTamagochi.tamagochiClean;
  }
});

document.querySelector('#run').addEventListener('click', function () {
  myTamagochi.myRun();
  if(myTamagochi.happiness <= 0 || myTamagochi.food <= 0) {
    alert('Oh no!!! Your Tamagochi is dead!!');
    alert('He lived ' + time.toFixed(3) + 's');
    location.reload();
  } else {
    tamagochiHappiness.innerHTML = myTamagochi.happiness;
    tamagochiFood.innerHTML = myTamagochi.food;
  }
});
