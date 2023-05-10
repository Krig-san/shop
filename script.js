let lastId=5
let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []
//TODO ajout des id dans le tableau panier
//TODO deuxieme exercice a place des id mettre les produits dans le panier
//TODO associer un id pour chaque legume
//TODO bonus, afficher le panier en haut de la page html

//let panierTotal=0
function panierProduit(){
	document.querySelector("#total").innerHTML = panier.length;
}

panierProduit()

function afficherProduit(nomdufruit, price, images, id){
	document.querySelector('.container').innerHTML += // ajouter a la suite 
					`<div class="firstitem">
					<img class="img-fluid rounded"src="Images/${images}" alt="Pomme">
					<h3(${'1'})>
						${nomdufruit} ${price}€
					</h3>
					<h4>
						Commandez ci-dessous!
					</h4>
					<button onclick="ajoutPanier(${id})"> Ajouter au panier </button>
				</div>` /* porte sur ajout panier*/ 
};

fetch('./asset/fruits.json') //Appel de l'api (du fichier)
.then((response) => response.json()) //tranformation de la reponse pour prendre uniquement le contenu du fichier
.then((response) => { //recuperation de l'objet json
	const fruits = response.fruits;
let position = 0;

while(position < fruits.length){ 
		afficherProduit(
			fruits[position].fruitNom,
			fruits[position].prix,
			fruits[position].images,
			fruits[position].id);
			position++;
	};
 console.log("dans le fetch")
})

console.log("apres fetch")

function ajoutPanier/*porte*/(id){
	//panierTotal = panierTotal + 1;
console.log(id);
panier.push(id) // push interagir en ajoutant 1 élément
panierProduit();
localStorage.setItem("panier", JSON.stringify(panier)); // todo JSON.stringify JSON.parse rechercher a quoi il servent , 
}
//afficherProduit("seconditem", fruits[1], "3,49","Pomme verte.jpeg");

function afficherLegume(nomduLégume, money, pictures) {
	document.querySelector('#legumes').innerHTML += `<div class="firstitem">
			<img class="img-fluid rounded"src="Images/${pictures}" alt="Pomme">
			<h3 (${'2'})>
				${nomduLégume} ${money}€
			</h3>
			<h4>
				Commandez ci-dessous!
			</h4>
			<button> Ajouter au panier </button>
		</div>`
};
//TODO de stocker les legumes dans une API (pareil que pour les fruits)

fetch('./asset/légumes.json')
.then((response) => response.json())
.then((response) => {
	const légumes = response.légumes;
let position = 0;

 while (position < légumes.length) {
	afficherLegume(
		légumes[position].légumeNom,
		légumes[position].cash,
		légumes[position].Pictures);
		position++;
};
})

const form = document.querySelector('#saisi');
const produit = "toto";



form.addEventListener("submit", (e)=> { //identifie le bouton appuyer 'envoie un echo'
	e.preventDefault(); //bloque le reload de la page
	console.log(form.nom.value) // associé et voir que il y a une reponse
	console.log(form.prix.value)
	console.log(form.images.value)
	console.log(form.section.value)
	// faire le form.image.value et l'ajouter a afficher produit
	if(form.section.value==='Fruit'){
		afficherProduit(form.nom.value,form.prix.value,form.images.value,lastId++/*++ preshot pour la prochaine valeur*/)//appel la fonction de par le html
	}
	else if(form.section.value==='Légume'){
		afficherLegume(form.nom.value,form.prix.value,form.images.value)
	}
		
	//afficherProduit(form.nom.value,form.prix.value,form.images.value) //appel la fonction de par le html
})


//gestion de la local storage

//localStorage.setItem('nom','toto'); // crée un élément dans le local storage

//const nom = localStorage.getItem('nom');	// getelementbyid récupérer l'item
//document.getElementById('nom').innerHTML = nom; 