function afficherProduit(classdiv, nomdufruit, price, images){
	document.querySelector('.container').innerHTML += `<div class="${classdiv}">
					<img class="img-fluid rounded"src="Images/${images}" alt="Pomme">
					<h3>
						${nomdufruit} ${price}€
					</h3>
					<h4>
						Commandez ci-dessous!
					</h4>
					<button> Commandez! </button>
				</div>`
};

fetch('./asset/fruits.json') //Appel de l'api (du fichier)
.then((response) => response.json()) //tranformation de la reponse pour prendre uniquement le contenu du fichier
.then((response) => { //recuperation de l'objet json
	const fruits = response.fruits;
let position = 0;

while(position < fruits.length){
		afficherProduit(fruits[position].classDiv,
			fruits[position].fruitNom,
			fruits[position].prix,
			fruits[position].images);
			position++;
	};
 console.log("dans le fetch")
})

console.log("apres fetch")


//afficherProduit("seconditem", fruits[1], "3,49","Pomme verte.jpeg");

function afficherLegume(divclass , nomduLégume, money, pictures) {
	document.querySelector('.container').innerHTML += `<div class="${divclass}">
			<img class="img-fluid rounded"src="Images/${pictures}" alt="Pomme">
			<h3>
				${nomduLégume} ${money}€
			</h3>
			<h4>
				Commandez ci-dessous!
			</h4>
			<button> Commandez! </button>
		</div>`
};
//TODO de stocker les legumes dans une API (pareil que pour les fruits)
let légumes = [
	{
		légumeNom: "Pomme rouge",
		divClass: "firstitem",
		cash:"1,99",
		Pictures:"Pomme.webp"
	},

		{
			légumeNom: "Pomme Verte",
			divClass: "seconditem",
			cash:"1,99",
			Pictures:"Pommeverte.jpeg"
		},
		{
			légumeNom: "Mangue",
			divClass: "thirthitem",
			cash:"2",
			Pictures:"Mangue.jpeg"
		}
];


/*while (position < légumes.length) {
	afficherLegume(légumes[position].divClass, légumes[position].légumeNom, légumes[position].cash,fruits[position].images)
};*/
