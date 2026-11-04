/* Add fade/slide reveals and a subtle morphing hover effect to page elements. */
(() => {
	const css = `
		.motion-reveal {
			opacity: 0;
			transform: translateY(20px);
			transition: opacity 550ms ease, transform 550ms ease;
		}
		.motion-reveal.motion-visible {
			opacity: 1;
			transform: translateY(0);
		}
		.motion-morph {
			transition: transform 300ms ease, border-radius 300ms ease, box-shadow 300ms ease;
		}
		.motion-morph:hover {
			transform: scale(1.025);
			border-radius: 14px;
			box-shadow: 0 8px 22px rgb(0 0 0 / 14%);
		}
		@media (prefers-reduced-motion: reduce) {
			.motion-reveal, .motion-morph, .motion-morph:hover {
				transition: none;
				transform: none;
			}
			.motion-reveal { opacity: 1; }
		}
	`;

	const style = document.createElement('style');
	style.textContent = css;
	document.head.appendChild(style);

	function initializeAnimations() {
		const revealElements = document.querySelectorAll(
			'main section, main article, .card, .impact-card, [data-animate="reveal"]'
		);
		const morphElements = document.querySelectorAll(
			'.card, .impact-card, button:not(.impact-card-trigger), [data-animate="morph"]'
		);

		revealElements.forEach((element, index) => {
			element.classList.add('motion-reveal');
			element.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
		});
		morphElements.forEach((element) => element.classList.add('motion-morph'));

		if (!('IntersectionObserver' in window)) {
			revealElements.forEach((element) => element.classList.add('motion-visible'));
			return;
		}

		const observer = new IntersectionObserver((entries, currentObserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('motion-visible');
					currentObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		revealElements.forEach((element) => observer.observe(element));
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initializeAnimations, { once: true });
	} else {
		initializeAnimations();
	}
})();
