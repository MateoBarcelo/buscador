const searchParams = new URLSearchParams(window.location.search);

const id = searchParams.get("id");

const fetchLaunch = async (id) => {
    console.log(id);
    const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
    const launch = await response.json();
    
    return launch;
    };

const renderLaunch = (launch) => {
    const formattedDate = new Date(
        launch.date_unix * 1000
    ).toLocaleDateString("es-ar", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    document.getElementById("launch").innerHTML = `
    <div class="launch">
        <div>
            <iframe
                class="launch_frame"
                src="https://www.youtube.com/embed/${launch.links.youtube_id}"
                title="${launch.name} launch video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            >
            </iframe>
        </div>
        <div class="launch_info">
            <div class="title">
                <h2>${launch.name}</h2>
                <h3 class="${launch.success ? "success" : "failed"} state">${
        launch.success ? "Exito" : "Fallo"
        }</h3>
            </div>
            <div class="details ondetail">
                <div class="rocket">
                <p class="date"><b>Fecha: </b> ${formattedDate}</p>
                <p class="rocket"><b>Articulo: </b>${launch.links.article}</p>
                <p class="info">${launch.details || "Sin descripcion"}</p>
                </div>
                <div class="patch">
                <img src="${launch.links.patch.small}" alt="${launch.name} patch" />
                </div>
            </div>
        </div>
    </div>
    `;
}

const init = async () => {
    const launch = await fetchLaunch(id);
    renderLaunch(launch);
}

init();