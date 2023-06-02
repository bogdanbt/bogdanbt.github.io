setInterval(miniCluster1,5000); 
function miniCluster1(){
    var symbol=document.getElementById('symbol1').value;
    var symbolinterval=document.getElementById('symbol1interval').value;
    var symbollimit=document.getElementById('symbol1limit').value;
    var limit=parseInt(symbollimit)
    //console. log(symbol);
    //console. log(s);
    //var place='miniCluster1'
    //var s=String(symbol)
    var xmlHttp = new XMLHttpRequest();
    var url = 'https://www.binance.com/futures/data/takerlongshortRatio?symbol='+symbol+'&period='+symbolinterval+'&limit='+symbollimit; //http or https, tried both
    xmlHttp.open('GET', url);
    xmlHttp.onload = function (){
        ourData = JSON.parse (xmlHttp.responseText);
        console. log(ourData);
        var price= [] ,qty= [];
        cumdelta=[];
        rsi=[]
        //Collect Data for Asks
        for (i=0;i<limit;i++){
            price.push(parseFloat(ourData[i] ["buyVol"])-parseFloat(ourData[i] ["sellVol"]));
            //yAsk.push(ourData ["asks"][i][0]) ;
            qty.push (new Date(ourData[i] ["timestamp"])) ;
        }
        cumdelta[0]=price[0];
        for (i=1; i<limit;i++){
            price[i]=price[i-1]+price[i];
            //rsi[i]=100-(100/(1+price[i]))
        }
        //var data1=[{
        //    type:'line',
        //    x:qty,
        //    y:price,
        //}];
        var data1=[{
                type:'line',
                x:qty,
                y:price,
            }];
        var layout = {
            title: symbol+'delta'
          };
        Plotly.newPlot("miniCluster1",data1,layout);
    }
    xmlHttp. send();

}
