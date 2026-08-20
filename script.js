const promptBox =
    document.getElementById("prompt");

const generateButton =
    document.getElementById("generate");

const messages =
    document.getElementById("messages");

const version =
    document.getElementById("version");

const buildPanel =
    document.getElementById("buildPanel");

const progressBar =
    document.getElementById("progressBar");

const buildStatus =
    document.getElementById("buildStatus");

const downloadButton =
    document.getElementById("download");

let selectedLoader = "Forge";

let generatedProject = "";


// ===============================
// LOADER SELECTION
// ===============================

const loaders =
    document.querySelectorAll(".loader");

loaders.forEach(loader => {

    loader.addEventListener("click", () => {

        loaders.forEach(item => {
            item.classList.remove("active");
        });

        loader.classList.add("active");

        selectedLoader =
            loader.dataset.loader;

    });

});


// ===============================
// QUICK PROMPTS
// ===============================

function setPrompt(text) {

    promptBox.value = text;

    promptBox.focus();

}


// ===============================
// ADD MESSAGE
// ===============================

function addMessage(text, type) {

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    message.textContent =
        text;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;
}


// ===============================
// GENERATE
// ===============================

generateButton.addEventListener(
    "click",
    generateMod
);


promptBox.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            generateMod();

        }

    }
);


function generateMod() {

    const request =
        promptBox.value.trim();

    if (!request) {

        promptBox.focus();

        return;

    }


    const selectedVersion =
        version.value;


    // User message

    addMessage(
        request,
        "user"
    );


    promptBox.value = "";


    // AI response

    setTimeout(() => {

        addMessage(
            `Got it! I'll design this for ${selectedLoader} on Minecraft ${selectedVersion}.`,
            "bot"
        );

    }, 300);


    // Open build panel

    setTimeout(() => {

        startBuild(
            request,
            selectedLoader,
            selectedVersion
        );

    }, 700);

}


// ===============================
// BUILD SIMULATION
// ===============================

function startBuild(
    request,
    loader,
    minecraftVersion
) {

    buildPanel.classList.remove(
        "hidden"
    );


    progressBar.style.width =
        "0%";


    downloadButton.disabled =
        true;


    const steps = [
        "Reading your idea",
        "Selecting mod architecture",
        "Creating mod structure",
        "Generating content",
        "Creating recipes",
        "Preparing project"
    ];


    let current = 0;


    const interval =
        setInterval(() => {

            current++;

            const percentage =
                Math.min(
                    (current / steps.length) * 100,
                    100
                );


            progressBar.style.width =
                percentage + "%";


            if (current <= steps.length) {

                buildStatus.textContent =
                    steps[current - 1]
                        .toUpperCase() + "...";

            }


            if (
                current >=
                steps.length
            ) {

                clearInterval(interval);

                buildStatus.textContent =
                    "PROJECT READY";

                generatedProject =
                    createProjectInfo(
                        request,
                        loader,
                        minecraftVersion
                    );


                downloadButton.disabled =
                    false;

            }

        }, 550);

}


// ===============================
// PROJECT INFO
// ===============================

function createProjectInfo(
    request,
    loader,
    minecraftVersion
) {

    return `CORTEXA MOD PROJECT

MOD LOADER
${loader}

MINECRAFT VERSION
${minecraftVersion}

USER REQUEST
${request}

PROJECT STRUCTURE

src/
 └── main/
     ├── java/
     └── resources/

MOD INFORMATION

Loader: ${loader}
Minecraft: ${minecraftVersion}

FEATURES REQUESTED

${detectFeatures(request)}

NOTE

This front-end creates the project specification.
A secure backend/build service is required to
generate and compile the actual Minecraft source
code and JAR file.
`;

}


// ===============================
// FEATURE DETECTION
// ===============================

function detectFeatures(text) {

    const lower =
        text.toLowerCase();

    const features = [];


    if (
        lower.includes("horror") ||
        lower.includes("scary") ||
        lower.includes("creepy")
    ) {

        features.push(
            "• Horror atmosphere"
        );

    }


    if (
        lower.includes("mob") ||
        lower.includes("monster") ||
        lower.includes("creature") ||
        lower.includes("boss")
    ) {

        features.push(
            "• Custom entities"
        );

    }


    if (
        lower.includes("sword") ||
        lower.includes("weapon") ||
        lower.includes("armor")
    ) {

        features.push(
            "• Custom combat items"
        );

    }


    if (
        lower.includes("dimension") ||
        lower.includes("world")
    ) {

        features.push(
            "• Custom dimension/world"
        );

    }


    if (
        lower.includes("magic") ||
        lower.includes("spell")
    ) {

        features.push(
            "• Magic abilities"
        );

    }


    if (
        lower.includes("machine") ||
        lower.includes("technology")
    ) {

        features.push(
            "• Technology systems"
        );

    }


    if (
        lower.includes("block") ||
        lower.includes("ore")
    ) {

        features.push(
            "• Custom blocks"
        );

    }


    if (
        lower.includes("recipe") ||
        lower.includes("craft")
    ) {

        features.push(
            "• Custom crafting"
        );

    }


    if (features.length === 0) {

        features.push(
            "• Custom gameplay mechanics"
        );

    }


    return features.join("\n");

}


// ===============================
// DOWNLOAD PROJECT SPEC
// ===============================

downloadButton.addEventListener(
    "click",
    () => {

        if (!generatedProject)
            return;


        const file =
            new Blob(
                [generatedProject],
                {
                    type:
                        "text/plain"
                }
            );


        const url =
            URL.createObjectURL(file);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "cortexa-mod-project.txt";


        link.click();


        URL.revokeObjectURL(url);

    }
);
