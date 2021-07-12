  // const platfopt = [];

  // function getPlatforms() {
  //   fetch("https://api.rawg.io/api/platforms") //url de api con plataformas
  //     .then(response => response.json()) //aplica json y retorna
  //     .then(json => {
  //       let data = json.results;
  //       for (let i=0 ; i< data.length; i++){
  //         //plataformas.push(data[i].name)
  //         let obj = {value: data[i].name,label: data[i].name };
  //         platfopt.push(obj);
  //       }
  //     })
  //     .catch(error => console.log(error))
  //   return platfopt;
  // }
  
  // let plataformas = getPlatforms();
  
  // export default plataformas;
  
export const platfopt = [
{ value: "PC", label: "PC" },
{ value: "PlayStation 5", label: "PlayStation 5" },
{ value: "PlayStation 4", label: "PlayStation 4" },
{ value: "Xbox One", label: "Xbox One" },
{ value: "Xbox Series S/X", label: "Xbox Series S/X" },
{ value: "Nintendo Switch", label: "Nintendo Switch" },
{ value: "iOS", label: "iOS" },
{ value: "Android", label: "Android" },
{ value: "Nintendo 3DS", label: "Nintendo 3DS" },
{ value: "Nintendo DS", label: "Nintendo DS" },
{ value: "Nintendo DSi", label: "Nintendo DSi" },
{ value: "macOS", label: "macOS" },
{ value: "Linux", label: "Linux" },
{ value: "Xbox 360", label: "Xbox 360" },
{ value: "Xbox", label: "Xbox" },
{ value: "PlayStation 3", label: "PlayStation 3" },
{ value: "PlayStation 2", label: "PlayStation 2" },
{ value: "PlayStation", label: "PlayStation" },
{ value: "PS Vita", label: "PS Vita" },
{ value: "PSP", label: "PSP" },
{ value: "Wii U", label: "Wii U" },
{ value: "Wii", label: "Wii" },
{ value: "GameCube", label: "GameCube" },
{ value: "Nintendo 64", label: "Nintendo 64" },
{ value: "Game Boy Advance", label: "Game Boy Advance" },
{ value: "Game Boy Color", label: "Game Boy Color" },
{ value: "Game Boy", label: "Game Boy" },
{ value: "SNES", label: "SNES" },
{ value: "NES", label: "NES" },
{ value: "Classic Macintosh", label: "Classic Macintosh" },
{ value: "Apple II", label: "Apple II" },
{ value: "Commodore / Amiga", label: "Commodore / Amiga" },
{ value: "Atari 7800", label: "Atari 7800" },
{ value: "Atari 5200", label: "Atari 5200" },
{ value: "Atari 2600", label: "Atari 2600" },
{ value: "Atari Flashback", label: "Atari Flashback" },
{ value: "Atari 8-bit", label: "Atari 8-bit" },
{ value: "Atari ST", label: "Atari ST" },
{ value: "Atari Lynx", label: "Atari Lynx" },
{ value: "Atari XEGS", label: "Atari XEGS" },
{ value: "Genesis", label: "Genesis" },
{ value: "SEGA Saturn", label: "SEGA Saturn" },
{ value: "SEGA CD", label: "SEGA CD" },
{ value: "SEGA 32X", label: "SEGA 32X" },
{ value: "SEGA Master System", label: "SEGA Master System" },
{ value: "Dreamcast", label: "Dreamcast" },
{ value: "3DO", label: "3DO" },
{ value: "Jaguar", label: "Jaguar" },
{ value: "Game Gear", label: "Game Gear" },
{ value: "Neo Geo", label: "Neo Geo"}
]

export default platfopt;
