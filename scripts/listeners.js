import { renderLaunches, getLaunches } from "../scripts/main.js";

document.getElementById("searcher").addEventListener("input", async (event) => {
  const search = event.target.value.toLowerCase();

  const launches = await getLaunches();
  
  const filteredLaunches = launches.filter((launch) => {
    const formattedDate = new Date(
      launch.date_unix * 1000
    ).toLocaleDateString("es-ar", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    const terms = [
      launch.name,
      formattedDate,
      launch.success ? "Exito" : "Fallo",
    ];

    let found = false;
    terms.forEach((term) => {
      if (term?.toLowerCase().includes(search)) {
        found = true;
      }
    });

    return found;
  });

  renderLaunches(filteredLaunches);
});