// ===============================
// KURO PROFILE
// ===============================

const cat = {
  name: "くぅ",
  birthday: new Date(2018, 4, 15), // 月は0始まり
  homeDay: new Date(2018, 6, 8)
};

// ===============================
// Utility
// ===============================

function daysBetween(start, end) {
  const oneDay = 1000 * 60 * 60 * 24;

  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  return Math.floor((e - s) / oneDay);
}

// ===============================
// OUR DAYS
// ===============================

function updateOurDays() {

  const today = new Date();

  const days =
    daysBetween(cat.homeDay, today) + 1;

  document.getElementById("ourDays").textContent =
    days.toLocaleString();

}

// ===============================
// AGE
// ===============================

function updateAge() {

  const today = new Date();

  let years =
    today.getFullYear() -
    cat.birthday.getFullYear();

  let months =
    today.getMonth() -
    cat.birthday.getMonth();

  let days =
    today.getDate() -
    cat.birthday.getDate();

  if (days < 0) {

    months--;

    const prevMonth =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

    days += prevMonth.getDate();

  }

  if (months < 0) {

    years--;

    months += 12;

  }

  document.getElementById("age").textContent =
    `${years}歳${months}か月${days}日`;

}

// ===============================
// NEXT BIRTHDAY
// ===============================

function updateNextBirthday() {

  const today = new Date();

  let nextBirthday =
    new Date(
      today.getFullYear(),
      cat.birthday.getMonth(),
      cat.birthday.getDate()
    );

  if (today > nextBirthday) {

    nextBirthday =
      new Date(
        today.getFullYear() + 1,
        cat.birthday.getMonth(),
        cat.birthday.getDate()
      );

  }

  const remain =
    daysBetween(today, nextBirthday);

  document.getElementById("nextBirthday").textContent =
    `あと ${remain} 日`;

}

// ===============================
// Counter Animation
// ===============================

function animateNumber(target) {

  const element =
    document.getElementById("ourDays");

  const duration = 900;

  const start = performance.now();

  function frame(now) {

    const progress =
      Math.min(
        (now - start) / duration,
        1
      );

    const value =
      Math.floor(target * progress);

    element.textContent =
      value.toLocaleString();

    if (progress < 1) {

      requestAnimationFrame(frame);

    }

  }

  requestAnimationFrame(frame);

}

// ===============================
// Initialize
// ===============================

function init() {

  const today = new Date();

  const totalDays =
    daysBetween(cat.homeDay, today) + 1;

  animateNumber(totalDays);

  updateAge();

  updateNextBirthday();

}

init();