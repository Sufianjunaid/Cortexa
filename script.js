// =========================
// CORTEXA JAVASCRIPT
// =========================


// Page loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("CORTEXA website loaded.");


    // =========================
    // HERO ANIMATION
    // =========================

    const heroContent = document.querySelector(".hero-content");

    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";

    setTimeout(function () {

        heroContent.style.transition =
            "all 1s cubic-bezier(.2,.8,.2,1)";

        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";

    }, 200);


    // =========================
    // BUTTON CLICK EFFECT
    // =========================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.style.transform = "scale(0.96)";

            setTimeout(function () {
                button.style.transform = "";
            }, 120);

        });

    });


    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            header.style.background =
                "rgba(5,5,7,0.85)";

            header.style.boxShadow =
                "0 10px 40px rgba(0,0,0,0.25)";

        } else {

            header.style.background =
                "rgba(5,5,7,0.55)";

            header.style.boxShadow = "none";
        }

    });


    // =========================
    // MOUSE GLOW
    // =========================

    const glow = document.querySelector(".hero-glow");

    document.addEventListener("mousemove", function (event) {

        if (!glow) return;

        const x =
            (event.clientX / window.innerWidth - 0.5) * 40;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 40;

        glow.style.marginLeft = x + "px";
        glow.style.marginTop = y + "px";

    });


    // =========================
    // BUTTON RIPPLE
    // =========================

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.style.position = "absolute";
            ripple.style.width = "10px";
            ripple.style.height = "10px";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,0.4)";
            ripple.style.transform = "scale(0)";
            ripple.style.pointerEvents = "none";

            const rect = button.getBoundingClientRect();

            ripple.style.left =
                (event.clientX - rect.left) + "px";

            ripple.style.top =
                (event.clientY - rect.top) + "px";

            button.style.position = "relative";
            button.style.overflow = "hidden";

            button.appendChild(ripple);

            ripple.animate(
                [
                    {
                        transform: "scale(0)",
                        opacity: 0.8
                    },
                    {
                        transform: "scale(20)",
                        opacity: 0
                    }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );

            setTimeout(function () {
                ripple.remove();
            }, 600);

        });

    });

});
