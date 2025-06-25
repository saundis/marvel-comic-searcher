const docKey = "https://gateway.marvel.com/docs/public";
const base = "https://gateway.marvel.com/v1/public";
const publicKey = "YOUR_PUBLIC_KEY";

const searchButton = document.querySelector(".search");
const resetButton = document.querySelector(".reset");
const input = document.querySelector("input");

const itemsList = document.querySelector("ul");

const getComics = async function (characterID) {
  try {
    let result = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${characterID}/comics?apikey=${publicKey}`
    );
    result = await result.json();
    console.log(result.data.results);
    return result.data.results;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const getCharacters = async function () {
  try {
    let result = await fetch(
      `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&nameStartsWith=${input.value}`
    );
    result = await result.json();
    showCharacters(result.data.results);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

function showCharacters(charactersList) {
  itemsList.innerHTML = "";
  if (charactersList.length === 0) {
    const newHeader = document.createElement("h2");
    newHeader.textContent = "No characters found";
    itemsList.append(newHeader);
    return;
  }

  charactersList.forEach((information) => {
    console.log(information);
    const newListItem = document.createElement("li");

    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character");

    const image = document.createElement("img");
    image.src =
      information.thumbnail.path + "." + information.thumbnail.extension;

    const name = document.createElement("div");
    name.textContent = information.name;

    characterDiv.append(image);
    characterDiv.append(name);
    newListItem.append(characterDiv);
    itemsList.append(newListItem);
  });
}

function removeSearchedItems() {
  itemsList.style.visibility = "hidden";
  itemsList.innerHTML = "";
}

searchButton.addEventListener("click", getCharacters);
resetButton.addEventListener("click", removeSearchedItems);
