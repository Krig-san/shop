// npm install mysql --save 
// npm install nodemailer --save
// install une bibliotheque (exemple mysql)
const express = require("express");
const fs = require ("fs");
const cors = require ("cors");
const app = express(); //construit un serveur trés simple rapidement
const bodyParser = require("body-parser");
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'azerty',
    database: 'sofruitdb'
  });
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('bdd ok');
  });


app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
res.send('pondu')
})


app.get('/fruits',(req,res)=>{
    /*fs.readFile('../asset/fruits.json','utf8',(error,data)=> { 
       const dataObj = JSON.parse(data);
        const fruits = dataObj.fruits;
       res.send(JSON.stringify(fruits))
    }) */
    db.query('select * from fruits', (error,result,fields)=>{
        if (error) {
            throw error;
        }
        console.log(result);
        res.send(JSON.stringify(result))
    })
})

app.get('/legumes',(req,res)=>{ // get envoie des donnés a celui qui m'appelle / légumes
    fs.readFile('../asset/légumes.json','utf8',(error,data)=> {
        const dataObj = JSON.parse(data);//recupere les données
        const legumes = dataObj.légumes; // recuperer les données
        res.send(JSON.stringify(legumes)) // envoie les données
    })
})


app.post('/lots',(req,res)=>{ //reçois des informations en outre les lots
    console.log(req.body)
    res.send('123')
})

app.put('/login/:id', (req,res)=>{
    
    let update = "update users set ";
    if (req.body.nom) {
        update = update + `name='${req.body.nom}'` // +=
    }
    if (req.body.pre === "1234"){   
        update += "auth='verif'"
    }

    console.log(req.body)
    console.log(update)
                db.query(update, (error,result)=>{
                        if (error){
                            throw error;
                            }
                            res.send(JSON.stringify({
                                message: 'success'
                            }))
                    });
                 }) 



app.put('/login/:id/auth', (req,res)=>{
    
/*
parametre(
    -> id int auto_increment primary key,
    -> name varchar(15),
    -> prenom varchar(15),
    -> password varchar(15),
    -> foreign key(userId) references users(id));
*/
let update = "update users set ";
if (req.body.nom) {
    update = update + `name='${req.body.nom}'` // +=
}
if (req.body.pre){
    if(req.body.nom){
        update += ", ";
    }
    update += `prenom='${req.body.pre}'`
}
if (req.body.password){
    if(req.body.nom || req.body.pre){ // ||| shift + option + L || signe du ou 
    update+= ", "
    }
    update +=  `password='${req.body.password}'`
}
update += ` where id=${req.params.id};`
    //const update = `update users set name=${req.body.nom}, prenom=${req.body.pre}, password=${req.body.password} where id=${req.body.id};`;
console.log(req.body)
console.log(update)
            db.query(update, (error,result)=>{
                    if (error){
                        throw error;
                        }
                        res.send(JSON.stringify({
                            message: 'success'
                        }))
                });
             }) 

app.post('/star', (req,res)=>{ // prend en compte et mes a jour la notation
    console.log(req.body)
    const create = `insert into star(value,userId,fruitId) values ('${req.body.notation}', '${req.body.userId}','${req.body.productId}');`
    const select = `select count(*) as mb from star where userId=${req.body.userId} and fruitId=${req.body.productId};`
    const update = `update star set value=${req.body.notation} where userId=${req.body.userId} and fruitId=${req.body.productId};`;
    // click > create 
    // click > update > create 
    db.query(select, (error,result)=>{
        if (error){
            throw error;
            }
            console.log(result[0].mb);
            if(result[0].mb === 0){
                db.query(create, (error,result)=>{
                    if (error){
                        throw error;
                        }
                        console.log(result);
                        res.send(JSON.stringify({
                            message: 'success'
                        }))
                        console.log(req.body);
                        console.log(req.body.value);
                        console.log(req.body.userId);
                       
                        // todo enregistrer la value par account 
                })
             }
             else{
                db.query(update, (error,result)=>{
                    if (error){
                        throw error;
                        }
                        res.send(JSON.stringify({
                            message: 'success'
                        }))
                });
             }
    })
    return;

    
   
})

app.post('/login', (req,res)=>{ // valide l'account entrée 
   /* if (req.body.name === 'prout' 
   &&  req.body.mdp === 'prout'){
    const response = { message : 'good account '};
    res.send(JSON.stringify(response))
   }
   else {
     const response = { message : 'not good account'}
     res.send(JSON.stringify(response))
   }*/
   db.query('select*from users', (error,result,fields)=>{
    if (error){
        throw error;
        }
        //todo la connexion doit se faire en comparent les logs de la bases de donnés
        console.log(result[0].password);
    let index = 0;
    while (index < result.length){
        const id = result[index].id;
        const name = result[index].name;
        const password = result[index].password;
        console.log("result : ")
        console.log(result[index]);
        console.log("compare : " + req.body.name);
        console.log("compare : " + req.body.password);
        if (name === req.body.name &&
             password === req.body.password){
        const response = {
            id,
            look : 'good account'};
        console.log("good credential")
        res.send(JSON.stringify(response))
        return ;
            }
        index++

    } ;

    //* verifié que sa marche todo verifié que sa marche , faire en sorte de switch de page quand le compte est bon , mettre un message quand le compte n'est pas bon

    })
})

/*
db.query('select * from fruits', (error,result,fields)=>{
        if (error) {
            throw error;
        }
        console.log(result);
        res.send(JSON.stringify(result))
    })
*/




app.post('/inscription', (request,response)=>{ 
   console.log(request.body); 
   const create = `insert into users (name,prenom,password,email,date) values ('${request.body.nom}', '${request.body.pre}','${request.body.password}','${request.body.email}','${request.body.date.replaceAll("-", "")}'); 
`
        db.query(create, (error,result,fields)=>{
            if (error){
                throw error;
                }
                console.log(result);
                //TODO envoie du mail avec le code
                //Ne pas oublier de stocker le code dans la bdd pour faire la comparaison

                // ALTER TABLE users
                // ADD auth VARCHAR(25)
                const transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com",
                    secureConnection: false,
                    port:3000,
                    tls: {
                        ciphers: "SLV3"
                    },
                    auth: {
                        user: "adress outlook",
                        pass: " ",
                    }
                 })
                 const mailClient = {
                    from: "adress outlook",
                    to: `${request.body.email}`,
                    subject: "email de confirmation",
                    text:"code de verification 1234 écrivez le à a adresse : ..."
                 };
                 transporter.sendMail(mailClient, (error,info)=>{
                    if(error){
                     } else{
                    console.log("E-mail envoyé" + `insert into users (auth) values('1234')`)
                        }

                 })

                response.send(JSON.stringify({
                    message: 'success'
                }))
        })
})

app.listen(3000,()=> {          // lancer le serveur 
console.log("le serveur est lancer sur le port 3000")
})

//utilisation de nodemailer
//TODO lors de l'inscription envoyer un mail avec un code (ce code est à enregistrer en base donnée)
//TODO lorsque la personne arrive sur la page principal (mode connecter) et qu'il n'as confirmé son code il faut afficher un bouton en haut qui va le redirigier vers une nouvelle page html
//TODO sur cette page de confirmation il y a un formulaire pour soumettre ce code d'activation au backend
//TODO une lorsque le code est soumis au backend alors dans la base de donnée il faudra marqué que le compte est activé