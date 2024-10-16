const fetchLaunches = async () => {
  try {
    const response = await fetch("https://api.spacexdata.com/v4/launches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.slice(0, 100);
  } catch (error) {
    console.error(error);
  }
};

const renderLaunches = (launches) => {
  document.getElementById("launches").innerHTML = launches
    .map((launch) => {
      const formattedDate = new Date(
          launch.date_unix * 1000
        ).toLocaleDateString("es-ar", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });

      return `
      <div class="launch">
      <a href="detail.html?id=${launch.id}">
        <div class="cover">
          <h3>Ir a detalles</h3>
        </div>
      </a>
        <div>
          <img
            class="launch_frame"
            src="http://img.youtube.com/vi/${launch.links.youtube_id}/hqdefault.jpg"
          >
          </img>
        </div>
        <div class="launch_info">
          <div class="title">
            <h2>${launch.name}</h2>
            <h3 class="${launch.success ? "success" : "failed"} state">${
        launch.success ? "Exito" : "Fallo"
      }</h3>
          </div>
          <div class="details">
            <p class="date"><b>Fecha: </b> ${formattedDate}</p>
            <p class="rocket"><b>Articulo: </b>${launch.links.article}</p>
          </div>
        </div>
      </div>
      `;
    })
    .join("");
};

let launches = []

const getLaunches = async () => {
  if (launches.length) {
    return launches;
  }

}

const init = async () => {
  launches = await fetchLaunches();

  renderLaunches(launches);
};

init();

export { fetchLaunches, renderLaunches, launches, getLaunches };
