import ProductAdvertisingAPIv1 from './api-client';

const countries = {
    Australia: { host: 'webservices.amazon.com.au', region: 'us-west-2' },
    Brazil: { host: 'webservices.amazon.com.br', region: 'us-east-1' },
    Canada: { host: 'webservices.amazon.ca', region: 'us-east-1' },
    France: { host: 'webservices.amazon.fr', region: 'eu-west-1' },
    Germany: { host: 'webservices.amazon.de', region: 'eu-west-1' },
    India: { host: 'webservices.amazon.in', region: 'eu-west-1' },
    Italy: { host: 'webservices.amazon.it', region: 'eu-west-1' },
    Japan: { host: 'webservices.amazon.co.jp', region: 'us-west-2' },
    Mexico: { host: 'webservices.amazon.com.mx', region: 'us-east-1' },
    Netherlands: { host: 'webservices.amazon.nl', region: 'eu-west-1' },
    Singapore: { host: 'webservices.amazon.sg', region: 'us-west-2' },
    'Saudi Arabia': { host: 'webservices.amazon.sa', region: 'eu-west-1' },
    Spain: { host: 'webservices.amazon.es', region: 'eu-west-1' },
    Turkey: { host: 'webservices.amazon.com.tr', region: 'eu-west-1' },
    'United Arab Emirates': {
        host: 'webservices.amazon.ae',
        region: 'eu-west-1',
    },
    'United Kingdom': {
        host: 'webservices.amazon.co.uk',
        region: 'eu-west-1',
    },
    'United States': {
        host: 'webservices.amazon.com',
        region: 'us-east-1',
    },
};

const parseResponse = itemsResponseList => {
    var mappedResponse = {};
    for (var i in itemsResponseList) {
        if (itemsResponseList.hasOwnProperty(i)) {
            mappedResponse[itemsResponseList[i]['ASIN']] = itemsResponseList[i];
        }
    }
    return mappedResponse;
};

const onSuccess = data => {
    console.log('API called successfully.');
    var getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(
        data
    );
    console.log(
        'Complete Response: \n' + JSON.stringify(getItemsResponse, null, 1)
    );

    if (getItemsResponse['Errors'] !== undefined) {
        return JSON.stringify(getItemsResponse['Errors'], null, 1);
    }

    if (getItemsResponse['ItemsResult'] !== undefined) {
        return JSON.stringify(getItemsResponse, null, 1);
        //     console.log('Printing All Item Information in ItemsResult:');
        //     var response_list = parseResponse(
        //         getItemsResponse['ItemsResult']['Items']
        //     );
        //     for (var i in getItemsRequest['ItemIds']) {
        //         if (getItemsRequest['ItemIds'].hasOwnProperty(i)) {
        //             var itemId = getItemsRequest['ItemIds'][i];
        //             console.log(
        //                 '\nPrinting information about the Item with Id: ' + itemId
        //             );
        //             if (itemId in response_list) {
        //                 var item = response_list[itemId];
        //                 if (item !== undefined) {
        //                     if (item['ASIN'] !== undefined) {
        //                         console.log('ASIN: ' + item['ASIN']);
        //                     }
        //                     if (item['DetailPageURL'] !== undefined) {
        //                         console.log(
        //                             'DetailPageURL: ' + item['DetailPageURL']
        //                         );
        //                     }
        //                     if (
        //                         item['ItemInfo'] !== undefined &&
        //                         item['ItemInfo']['Title'] !== undefined &&
        //                         item['ItemInfo']['Title']['DisplayValue'] !==
        //                             undefined
        //                     ) {
        //                         console.log(
        //                             'Title: ' +
        //                                 item['ItemInfo']['Title']['DisplayValue']
        //                         );
        //                     }
        //                     if (
        //                         item['Offers'] !== undefined &&
        //                         item['Offers']['Listings'] !== undefined &&
        //                         item['Offers']['Listings'][0]['Price'] !==
        //                             undefined &&
        //                         item['Offers']['Listings'][0]['Price'][
        //                             'DisplayAmount'
        //                         ] !== undefined
        //                     ) {
        //                         console.log(
        //                             'Buying Price: ' +
        //                                 item['Offers']['Listings'][0]['Price'][
        //                                     'DisplayAmount'
        //                                 ]
        //                         );
        //                     }
        //                 }
        //             } else {
        //                 console.log('Item not found, check errors');
        //             }
        //         }
        //     }
    }
};

const onError = error => {
    console.log('Error calling PA-API 5.0!');
    console.log(
        'Printing Full Error Object:\n' + JSON.stringify(error, null, 1)
    );
    console.log('Status Code: ' + error['status']);
    if (
        error['response'] !== undefined &&
        error['response']['text'] !== undefined
    ) {
        console.log(
            'Error Object: ' +
                JSON.stringify(error['response']['text'], null, 1)
        );
    }
};

class AmazonProductAPI {
    constructor({
        accessKey,
        secretKey,
        /**
         * PAAPI Host and Region to which you want to send request.
         * For more details refer: https://'webservices.amazon.com/pa'api5/documentation/common-request-parameters.html#host-and-region
         */
        country = 'Italy',
        partnerTag = 'chebazza0c-21',
        partnerType = 'Associates',
        /**
         * Choose resources you want from GetItemsResource enum
         * For more details, refer: https://'webservices.amazon.com/pa'api5/documentation/get-items.html#resources-parameter
         */
        resources = [
            'BrowseNodeInfo.BrowseNodes',
            'BrowseNodeInfo.BrowseNodes.Ancestor',
            // 'BrowseNodeInfo.BrowseNodes.SalesRank',
            // 'BrowseNodeInfo.WebsiteSalesRank',
            'Images.Primary.Small',
            'Images.Primary.Medium',
            'Images.Primary.Large',
            'Images.Variants.Small',
            'Images.Variants.Medium',
            'Images.Variants.Large',
            'ItemInfo.ByLineInfo',
            'ItemInfo.Classifications',
            'ItemInfo.ContentInfo',
            'ItemInfo.ContentRating',
            'ItemInfo.Features',
            'ItemInfo.ProductInfo',
            'ItemInfo.TechnicalInfo',
            'ItemInfo.Title',
            'ItemInfo.TradeInInfo',
            'Offers.Listings.Availability.MaxOrderQuantity',
            'Offers.Listings.Availability.Message',
            'Offers.Listings.DeliveryInfo.IsAmazonFulfilled',
            'Offers.Listings.DeliveryInfo.IsFreeShippingEligible',
            'Offers.Listings.DeliveryInfo.IsPrimeEligible',
            'Offers.Listings.IsBuyBoxWinner',
            'Offers.Listings.LoyaltyPoints.Points',
            'Offers.Listings.MerchantInfo',
            'Offers.Listings.Price',
            'Offers.Listings.ProgramEligibility.IsPrimeExclusive',
            'Offers.Listings.Promotions',
            'Offers.Listings.SavingBasis',
            // 'Offers.Summaries.HighestPrice',
            // 'Offers.Summaries.LowestPrice',
            // 'Offers.Summaries.OfferCount',
        ],
    }) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.host = countries[country].host;
        this.region = countries[country].region;
        this.partnerTag = partnerTag;
        this.partnerType = partnerType;
        this.resources = resources;
        this.api = null;
    }

    init = () => {
        var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

        defaultClient.accessKey = this.accessKey;
        defaultClient.secretKey = this.secretKey;

        defaultClient.host = this.host;
        defaultClient.region = this.region;

        this.api = new ProductAdvertisingAPIv1.DefaultApi(defaultClient);
    };

    getItems = async ({ itemIds, condition = 'New' }) => {
        if (!this.api) {
            console.error('ProductApi.init() missing...');
            return;
        }
        if (!itemIds) {
            console.error('itemIds are required!');
            return;
        }

        let getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest();

        getItemsRequest = {
            PartnerTag: this.partnerTag,
            PartnerType: this.partnerType,
            ItemIds: itemIds,
            Condition: condition,
            Resources: this.resources,
        };

        return this.api.getItems(getItemsRequest).then(function (data) {
            return onSuccess(data);
        });
    };
}

const ProductAPI = config => {
    const ProductAPIWrapper = new AmazonProductAPI(config);

    ProductAPIWrapper.init();

    return ProductAPIWrapper;
};

export default ProductAPI;
