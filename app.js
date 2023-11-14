const header = document.querySelector("header");
const headerNav = document.querySelector("header nav");
const navLinkEls = document.querySelectorAll(".nav__wrapper li a");
const sections = document.querySelectorAll("section");
const navWrapper = document.querySelector(".nav__wrapper");
const hamburger = document.querySelector(".hamburger");
const hamIcon = document.querySelector(".fa-solid");
const slide = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider__btn--left");
const nextBtn = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");
const dot = document.querySelectorAll(".dot");
const container = document.querySelector(".slides");
const tabBtns = document.querySelectorAll(".tabbed__btn button");
const tabContents = document.querySelectorAll(
	".tabbed__contents .tabbed__content"
);
const valueDisplays = document.querySelectorAll(".num");
const experienceWrapper = document.querySelector(".experience__container");
const filterableBtns = document.querySelectorAll(".button__container button");
const filterableCards = document.querySelectorAll(".filterable__cards .card");
const filterBtn = document.querySelector(".filter-btn");
const btnContainer = document.querySelector(".button__container");

// TOGGLE NAV
hamburger.addEventListener("click", function (e) {
	navWrapper.classList.toggle("active");
	if (hamIcon.classList.contains("fa-bars")) {
		hamIcon.classList.replace("fa-bars", "fa-xmark");
	} else {
		hamIcon.classList.replace("fa-xmark", "fa-bars");
	}
});

// STICKY NAVIGATION
const navHeight = headerNav.getBoundingClientRect().height;
const stickyNav = function (entries) {
	const [entry] = entries;

	if (!entry.isIntersecting) headerNav.classList.add("sticky");
	else headerNav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// ACTIVE NAV LINK
navLinkEls.forEach((navLinkEl) => {
	navLinkEl.addEventListener("click", () => {
		navLinkEls.forEach((navLinkEl) => navLinkEl.classList.remove("active"));
		navLinkEl.classList.add("active");
	});
});

// PAGE NAVIGATION
navLinkEls.forEach(function (el) {
	el.addEventListener("click", function (e) {
		e.preventDefault();

		const id = this.getAttribute("href");
		// const id = e.target.getAttribute("href");

		document.querySelector(id).scrollIntoView({
			behavior: "smooth",
		});
	});
});

// SLIDER FUNCTIONALITY
// counter
let counter = 0;
const maxSlide = slide.length;

// NEXT BTN FUNCTION
nextBtn.addEventListener("click", slideNext);

function slideNext() {
	slide[counter].style.animation = "next1 0.5s ease-in forwards";

	if (counter >= maxSlide - 1) {
		counter = 0;
	} else {
		counter++;
	}

	slide[counter].style.animation = "next2 0.5s ease-in forwards";
	indicators(counter);
}

// PREV BTN FUNCTION
prevBtn.addEventListener("click", slidePrev);

function slidePrev() {
	slide[counter].style.animation = "prev1 0.5s ease-in forwards";

	if (counter == 0) {
		counter = maxSlide - 1;
	} else {
		counter--;
	}

	slide[counter].style.animation = "prev2 0.5s ease-in forwards";
	indicators(counter);
}

// AUTO SLIDING
function autoSliding() {
	deleteInterval = setInterval(timer, 5000);
	function timer() {
		slideNext();
		indicators(counter);
	}
}

autoSliding();

// STOP AUTO SLIDING WHEN MOUSE IS OVER
container.addEventListener("mouseover", function () {
	clearInterval(deleteInterval);
});

// RESUME AUTO SLIDING
container.addEventListener("mouseout", autoSliding);

// ADD AND REMOVE ACTIVE CLASS FROM THE INDICATORS
function indicators(slide) {
	for (i = 0; i < dot.length; i++) {
		dot[i].classList.remove("active");
	}
	// document.querySelector(`.dot[data-dot="${slide}"]`).classList.add("active");
	document.getElementById(`dot-${slide}`).classList.add("active");
}

// FILTERABLE CARDS
const filterCards = (e) => {
	document.querySelector("button.active").classList.remove("active");
	e.target.classList.add("active");

	filterableCards.forEach((card) => {
		card.classList.add("hide");
		if (
			card.dataset.name === e.target.dataset.name ||
			e.target.dataset.name === "all"
		) {
			card.classList.remove("hide");
			card.style.animation = "card-animate 0.5s ease-in forwards";
		}
	});
};

filterableBtns.forEach((button) =>
	button.addEventListener("click", filterCards)
);

filterBtn.addEventListener("click", function (e) {
	e.preventDefault();
	if (btnContainer.style.display == "none") {
		btnContainer.style.display = "block";
	} else {
		btnContainer.style.display = "none";
	}

	filterableBtns.forEach((btn) => {
		btn.addEventListener("click", function (e) {
			btnContainer.style.display = "none";
		});
	});
});

// NUMBER COUNTING
let CounterObserver = new IntersectionObserver(
	(entries, observer) => {
		let [entry] = entries;
		if (!entry.isIntersecting) return;
		let interval = 2000;

		valueDisplays.forEach((valueDisplay) => {
			let startValue = 0;
			let endValue = parseFloat(valueDisplay.getAttribute("data-val"));
			let duration = Math.floor(interval / endValue);
			let counter = setInterval(function () {
				startValue += 1;
				valueDisplay.textContent = startValue;
				if (startValue == endValue) {
					clearInterval(counter);
				}
			}, duration);
		});
	},
	{
		root: null,
		threshold: 0.4,
	}
);

CounterObserver.observe(experienceWrapper);

// TABBED COMPONENT
tabBtns.forEach((btn, index) => {
	btn.addEventListener("click", function (e) {
		tabBtns.forEach((btn) => btn.classList.remove("active"));
		btn.classList.add("active");

		const line = document.querySelector(".tab__line");
		line.style.width = e.target.offsetWidth + "px";
		line.style.left = e.target.offsetLeft + "px";
		console.log((line.style.width = e.target.offsetWidth + "px"));

		tabContents.forEach((content) => content.classList.remove("active"));
		tabContents[index].classList.add("active");
	});
});
