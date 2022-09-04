import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCDE6iSSQdUDda3nISwgOmg5gfEzM6uRXI",
    authDomain: "immutable-web-scraping.firebaseapp.com",
    projectId: "immutable-web-scraping",
    storageBucket: "immutable-web-scraping.appspot.com",
    messagingSenderId: "58644234285",
    appId: "1:58644234285:web:3e00ba23d904f18f94b8a4"
  };


// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref Immutascan
var IMColRef = collection(db, 'IMTradeVolume')

var im_total_sales= 0;

// get collection data
getDocs(IMColRef)
  .then(snapshot => {
    // console.log(snapshot.docs[0].data()["total_sales_last_day"]);
    // console.log(snapshot.docs[0].data()["change_in_sales_today_yesterday"]);
    im_total_sales = snapshot.docs[0].data()["total_sales_last_day"]; 
    document.getElementById("agg_im_total_sale").innerHTML = im_total_sales.toLocaleString();
    document.getElementById("agg_im_change").innerHTML = snapshot.docs[0].data()["change_in_sales_today_yesterday"].toLocaleString();
  }
  )
  .catch(err => {
    console.log(err.message)
  })

// collection ref Crypto Slam
var CSColRef = collection(db, 'CSBlockchainsBySalesVolume')

var chains = [];
var chain_data = [];
// get collection data
getDocs(CSColRef)
  .then(snapshot => {
    
    snapshot.docs.forEach(doc => {
        chains.push({ ...doc.data(), id: doc.id })
        var curr_chain = doc.data();
        var formatted_chain = {};
        formatted_chain["chainName"] = curr_chain["chainName"];
        formatted_chain["sales"] = curr_chain["sales"];//.toLocaleString();
        formatted_chain["change"] = (curr_chain["sales"] - curr_chain["prevSales"]);//.toLocaleString();
        formatted_chain["buyers"] = curr_chain["buyers"];//.toLocaleString();
        formatted_chain["txns"] = curr_chain["txns"];//.toLocaleString();         
        chain_data.push(formatted_chain);
        if(curr_chain["chainName"] === "ImmutableX"){
            document.getElementById("agg_cs_total_sale").innerHTML = curr_chain["sales"].toLocaleString();
            document.getElementById("agg_cs_change").innerHTML = (curr_chain["sales"] - curr_chain["prevSales"]).toLocaleString();
            document.getElementById("agg_cs_buy").innerHTML = curr_chain["buyers"].toLocaleString();
            document.getElementById("agg_cs_txn").innerHTML = curr_chain["txns"].toLocaleString();
            document.getElementById("agg_diff").innerHTML = (curr_chain["sales"] - im_total_sales).toLocaleString();
        }
        var chain_table = new Tabulator("#chain-table", {
            height:"405px", // set height of table
            data:chain_data, //assign data to table
            layout:"fitColumns", //fit columns to width of table (optional)
            columns:[ //Define Table Columns
                {title:"Chain", field:"chainName", width:200},
                {title:"Sales", field:"sales", width:180},
                {title:"Change", field:"change", width:180},
                {title:"Buyers", field:"buyers", width:180},
                {title:"Transactions", field:"txns", width:175},
            ],
        });
    })
    
  }
  )
  .catch(err => {
    console.log(err.message)
  })


 