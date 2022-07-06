type brewery = {
  address_2: string | null;
  address_3: string | null;
  brewery_type: string | null;
  city: string | null;
  country: string | null;
  county_province: string | null;
  created_at: string | null;
  id: string;
  latitude: string | null;
  longitude: string | null;
  name: string;
  obdb_id: string | null;
  phone: string | null;
  postal_code: string;
  state: string;
  street: string | null;
  updated_at: string;
  website_url: string | null;
};

type State = {
  USState: string;
  breweries: brewery[];
};

let state: State = {
  USState: "",
  breweries: [],
};

function getBreweriesForState() {
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.USState}&per_page=10`)
    .then((resp) => resp.json())
    .then((breweries) => {
      state.breweries = breweries;
      render();
    });
}

function renderHeader() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;

  let h1 = document.createElement("h1");
  h1.textContent = "List of Breweries";

  let header = document.createElement("header");
  header.className = "search-bar";

  let form = document.createElement("form");
  form.id = "search-breweries-form";
  form.autocomplete = "off";

  let label = document.createElement("label");
  label.htmlFor = "search-breweries";

  let h2 = document.createElement("h2");
  h2.textContent = "Search breweries:";

  let input = document.createElement("input");
  input.id = "search-breweries";
  input.name = "search-breweries";
  input.type = "text";

  label.append(h2);
  form.append(label, input);
  header.append(form);
  mainEl.append(h1, header);
}

function renderBreweryList() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;

  let article = document.createElement("article");

  let ul = document.createElement("ul");
  ul.className = "breweries-list";

  for (let brewery of state.breweries) {
    renderSingleBrewery(brewery, ul);
  }

  article.append(ul);
  mainEl.append(article);
}

function renderSingleBrewery(brewery: brewery, ul: HTMLUListElement) {
  let li = document.createElement("li");

  let h2El = document.createElement("h2");
  h2El.textContent = brewery.name;

  let divEl = document.createElement("div");
  divEl.className = "type";
  divEl.textContent = brewery.brewery_type;

  let sectionAdd = document.createElement("section");
  sectionAdd.className = "address";

  let h3Add = document.createElement("h3");
  h3Add.textContent = "Address:";

  let pAddress = document.createElement("p");
  pAddress.textContent = brewery.street;

  let pAdd = document.createElement("p");

  let strongAdd = document.createElement("strong");
  strongAdd.textContent = `${brewery.city}, ${brewery.postal_code}`;

  let sectionPhone = document.createElement("section");
  sectionPhone.className = "phone";

  let h3Phone = document.createElement("h3");
  h3Phone.textContent = "Phone:";

  let pPhone = document.createElement("p");
  pPhone.textContent = brewery.phone ? brewery.phone : "N/A";

  let sectionLink = document.createElement("section");
  sectionLink.className = "link";

  let aLink = document.createElement("a");
  if (brewery.website_url) {
    aLink.href = brewery.website_url ? brewery.website_url : "#";
    aLink.target = "_blank";
    aLink.textContent = "Visit Website";
  } else {
    aLink.textContent = "No Website";
  }

  li.append(h2El, divEl, sectionAdd, sectionPhone, sectionLink);
  sectionAdd.append(h3Add, pAddress, pAdd);
  pAdd.append(strongAdd);
  sectionPhone.append(h3Phone, pPhone);
  sectionLink.append(aLink);
  ul.append(li);
}

function render() {
  let mainEl = document.querySelector("main");
  if (mainEl === null) return;
  mainEl.textContent = "";

  renderHeader();
  renderBreweryList();
}

function listenToSelectStateForm() {
  let formEl = document.querySelector<HTMLFormElement>("#select-state-form");
  formEl?.addEventListener("submit", function (event) {
    event.preventDefault();
    let USState = formEl["select-state"].value;
    state.USState = USState;
    getBreweriesForState();
  });
}

listenToSelectStateForm();
render();
