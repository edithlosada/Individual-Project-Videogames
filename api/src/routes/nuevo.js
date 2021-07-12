router.get('/prueba', async (req, res) => {
  let resp = await fetch(`https://api.rawg.io/api/games/5286`)
    .catch(error => {
      console.log(error);
    });
  let respJson = await resp.json();
  let descrip = respJson.description_raw;
  //console.log(descrip);
  res.send(descrip);
});
