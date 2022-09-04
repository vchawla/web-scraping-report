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


 // collection ref Projects
var CSColRef = collection(db, 'Projects')

var chains = [];
var chain_data = [];

var sales_1d = [];
var sales_7d = [];
var sales_30d = [];

var buyers_1d = [];
var buyers_7d = [];
var buyers_30d = [];


var txns_1d = [];
var txns_7d = [];
var txns_30d = [];


// get collection data
getDocs(CSColRef)
  .then(snapshot => {
    
    snapshot.docs.forEach(doc => {
        // chains.push({ ...doc.data(), id: doc.id })
        var curr_data = doc.data();
        console.log(curr_data);

        var buyers_1d_row={};
        buyers_1d_row["project"]= doc.id;
        buyers_1d_row["cs"]= curr_data["cs_total_buyers_last_day"];
        buyers_1d_row["im"]= curr_data["im_total_buyers_last_day"];
        buyers_1d_row["diff"]= curr_data["im_total_buyers_last_day"] - curr_data["cs_total_buyers_last_day"];
        buyers_1d.push(buyers_1d_row);

        var buyers_7d_row={};
        buyers_7d_row["project"]= doc.id;
        buyers_7d_row["cs"]= curr_data["cs_total_buyers_last_7day"];
        buyers_7d_row["im"]= curr_data["im_total_buyers_last_7day"];
        buyers_7d_row["diff"]= curr_data["im_total_buyers_last_7day"] - curr_data["cs_total_buyers_last_7day"];
        buyers_7d.push(buyers_7d_row);

        var buyers_30d_row={};
        buyers_30d_row["project"]= doc.id;
        buyers_30d_row["cs"]= curr_data["cs_total_buyers_last_30day"];
        buyers_30d_row["im"]= curr_data["im_total_buyers_last_30day"];
        buyers_30d_row["diff"]= curr_data["im_total_buyers_last_30day"] - curr_data["cs_total_buyers_last_30day"];
        buyers_30d.push(buyers_30d_row);

        var sales_1d_row={};
        sales_1d_row["project"]= doc.id;
        sales_1d_row["cs"]= curr_data["cs_total_sales_last_day"];
        sales_1d_row["im"]= curr_data["im_total_sales_last_day"];
        sales_1d_row["diff"]= curr_data["im_total_sales_last_day"] - curr_data["cs_total_sales_last_day"];
        sales_1d.push(sales_1d_row);

        var sales_7d_row={};
        sales_7d_row["project"]= doc.id;
        sales_7d_row["cs"]= curr_data["cs_total_sales_last_7day"];
        sales_7d_row["im"]= curr_data["im_total_sales_last_7day"];
        sales_7d_row["diff"]= curr_data["im_total_sales_last_7day"] - curr_data["cs_total_sales_last_7day"];
        sales_7d.push(sales_7d_row);

        var sales_30d_row={};
        sales_30d_row["project"]= doc.id;
        sales_30d_row["cs"]= curr_data["cs_total_sales_last_30day"];
        sales_30d_row["im"]= curr_data["im_total_sales_last_30day"];
        sales_30d_row["diff"]= curr_data["im_total_sales_last_30day"] - curr_data["cs_total_sales_last_30day"];
        sales_30d.push(sales_30d_row);


        var txns_1d_row={};
        txns_1d_row["project"]= doc.id;
        txns_1d_row["cs"]= curr_data["cs_total_transactions_last_day"];
        txns_1d_row["im"]= curr_data["im_total_transactions_last_day"];
        txns_1d_row["diff"]= curr_data["im_total_transactions_last_day"] - curr_data["cs_total_transactions_last_day"];
        txns_1d.push(txns_1d_row);

        var txns_7d_row={};
        txns_7d_row["project"]= doc.id;
        txns_7d_row["cs"]= curr_data["cs_total_transactions_last_7day"];
        txns_7d_row["im"]= curr_data["im_total_transactions_last_7day"];
        txns_7d_row["diff"]= curr_data["im_total_transactions_last_7day"] - curr_data["cs_total_transactions_last_7day"];
        txns_7d.push(txns_7d_row);

        var txns_30d_row={};
        txns_30d_row["project"]= doc.id;
        txns_30d_row["cs"]= curr_data["cs_total_transactions_last_30day"];
        txns_30d_row["im"]= curr_data["im_total_transactions_last_30day"];
        txns_30d_row["diff"]= curr_data["im_total_transactions_last_30day"] - curr_data["cs_total_transactions_last_30day"];
        txns_30d.push(txns_30d_row);
      
        var chain_table = new Tabulator("#sales-table-1d", {
            height:"130px", // set height of table
            data:sales_1d, //assign data to table
            layout:"fitColumns", //fit columns to width of table (optional)
            columns:[ //Define Table Columns
                {title:"Project", field:"project", width:250},
                {title:"IM Sales", field:"im", width:250},
                {title:"CS Sales", field:"cs", width:250},
                {title:"Difference", field:"diff", width:250}
            ],
        });

        var chain_table = new Tabulator("#sales-table-7d", {
          height:"130px", // set height of table
          data:sales_7d, //assign data to table
          layout:"fitColumns", //fit columns to width of table (optional)
          columns:[ //Define Table Columns
              {title:"Project", field:"project", width:250},
              {title:"IM Sales", field:"im", width:250},
              {title:"CS Sales", field:"cs", width:250},
              {title:"Difference", field:"diff", width:250}
          ],
      });        


      var chain_table = new Tabulator("#sales-table-30d", {
        height:"130px", // set height of table
        data:sales_30d, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Project", field:"project", width:250},
            {title:"IM Sales", field:"im", width:250},
            {title:"CS Sales", field:"cs", width:250},
            {title:"Difference", field:"diff", width:250}
        ],
    });

            var chain_table = new Tabulator("#buyers-table-1d", {
            height:"130px", // set height of table
            data:buyers_1d, //assign data to table
            layout:"fitColumns", //fit columns to width of table (optional)
            columns:[ //Define Table Columns
                {title:"Project", field:"project", width:250},
                {title:"IM Buyers", field:"im", width:250},
                {title:"CS Buyers", field:"cs", width:250},
                {title:"Difference", field:"diff", width:250}
            ],
        });

        var chain_table = new Tabulator("#buyers-table-7d", {
          height:"130px", // set height of table
          data:buyers_7d, //assign data to table
          layout:"fitColumns", //fit columns to width of table (optional)
          columns:[ //Define Table Columns
              {title:"Project", field:"project", width:250},
              {title:"IM Buyers", field:"im", width:250},
              {title:"CS Buyers", field:"cs", width:250},
              {title:"Difference", field:"diff", width:250}
          ],
      });        


      var chain_table = new Tabulator("#buyers-table-30d", {
        height:"130px", // set height of table
        data:buyers_30d, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Project", field:"project", width:250},
            {title:"IM Buyers", field:"im", width:250},
            {title:"CS Buyers", field:"cs", width:250},
            {title:"Difference", field:"diff", width:250}
        ],
    });

            var chain_table = new Tabulator("#txns-table-1d", {
            height:"130px", // set height of table
            data:txns_1d, //assign data to table
            layout:"fitColumns", //fit columns to width of table (optional)
            columns:[ //Define Table Columns
                {title:"Project", field:"project", width:250},
                {title:"IM Txns", field:"im", width:250},
                {title:"CS Txns", field:"cs", width:250},
                {title:"Difference", field:"diff", width:250}
            ],
        });

        var chain_table = new Tabulator("#txns-table-7d", {
          height:"130px", // set height of table
          data:txns_7d, //assign data to table
          layout:"fitColumns", //fit columns to width of table (optional)
          columns:[ //Define Table Columns
              {title:"Project", field:"project", width:250},
              {title:"IM Txns", field:"im", width:250},
              {title:"CS Txns", field:"cs", width:250},
              {title:"Difference", field:"diff", width:250}
          ],
      });        


      var chain_table = new Tabulator("#txns-table-30d", {
        height:"130px", // set height of table
        data:txns_30d, //assign data to table
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Project", field:"project", width:250},
            {title:"IM Txns", field:"im", width:250},
            {title:"CS Txns", field:"cs", width:250},
            {title:"Difference", field:"diff", width:250}
        ],
    });


    })
    
  }
  )
  .catch(err => {
    console.log(err.message)
  }) 


 