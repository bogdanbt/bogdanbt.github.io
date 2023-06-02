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
    var url='https://www.binance.com/futures/data/openInterestHist?symbol='+symbol+'&period='+symbolinterval+'&limit='+symbollimit;

    //var url = 'https://www.binance.com/futures/data/takerlongshortRatio?symbol='+symbol+'&period='+symbolinterval+'&limit='+symbollimit; //http or https, tried both
    xmlHttp.open('GET', url);
    xmlHttp.onload = function (){
        ourData = JSON.parse (xmlHttp.responseText);
        console. log(ourData);
        var price= [] ,qty= [];
        cumdelta=[];
        rsi=[]
        //Collect Data for Asks
        for (i=0;i<limit;i++){
            price.push(parseFloat(ourData[i] ["sumOpenInterestValue"]));
            //yAsk.push(ourData ["asks"][i][0]) ;
            qty.push (new Date(ourData[i] ["timestamp"])) ;
        }
        
        var data1=[{
            type:'line',
            x:qty,
            y:price,
        }];
        var layout = {
            title: symbol+'oi'
          };
        Plotly.newPlot("oi",data1,layout);
    }
    xmlHttp. send();

}
