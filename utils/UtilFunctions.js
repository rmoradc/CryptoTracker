import React from 'react';



export async function fetchAllAssets() {
    let response = await fetch('https://assets-api.sylo.io/v2/all');
    let data = await response.json();
    return data;

}


export async function fetchAssetPriceForPeriod(id, period) {
    let response = await fetch(`https://assets-api.sylo.io/v2/asset/id/${id}/rate?fiat=NZD&period=${period}&type=historic`);
    let data = await response.json();
    return data;
}

export async function fetchAssetPrice(id) {
    let response = await fetch(`https://assets-api.sylo.io/v2/asset/id/${id}/rate?fiat=NZD`);
    let data = await response.json();
    console.log('from api ' + data.rate);
    return data;
}

export function assemblePriceHistory(data){
    let graphData = [];

    for(let i=0; i < data.length; i++){
        graphData.push(data[i].rate);
    }

    return graphData;
}


