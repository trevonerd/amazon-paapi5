# Product Advertising API 5.0 SDK for NodeJS

[![NPM](https://nodei.co/npm/amazon-paapi5.svg?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/amazon-paapi5/)

[![Version](https://badge.fury.io/js/amazon-paapi5.svg)](http://badge.fury.io/js/amazon-paapi5) [![npm](https://img.shields.io/npm/dt/amazon-paapi5.svg)](https://www.npmjs.com/package/amazon-paapi5)

This repository contains the official Product Advertising API 5.0 NodeJS SDK called **paapi5-nodejs-sdk** that allows you to access the [Product Advertising API](https://webservices.amazon.com/paapi5/documentation/index.html) from your NodeJS app.

## Installation
  
```shell
npm install amazon-paapi5 --save
```

```shell
yarn add amazon-paapi5
```

## Getting Started

### 1) Get Item/s Informations

```javascript
import ProductAPI from 'amazon-paapi5';
    
const products = ['ASIN1', 'ASIN2']

const api = ProductAPI({
    accessKey: ##AMAZON_ACCESS_KEY##,
    secretKey: ##AMAZON_SECRET_KEY##,
    country: 'Italy',
    partnerTag: 'chebazza0c-21',
    partnerType: 'Associates',
    resources: [
        'Images.Primary.Small',
        'ItemInfo.Title',
        'Offers.Listings.Price',

    ]
});

const result = await api.getItems({ itemIds: products })
```