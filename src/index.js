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

const getItemsOnSuccess = data => {
    console.log('API called successfully.');
    var getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(
        data
    );
    // console.log(
    //     'Complete Response: \n' + JSON.stringify(getItemsResponse, null, 1)
    // );

    if (getItemsResponse['Errors'] !== undefined) {
        return JSON.stringify(getItemsResponse['Errors'], null, 1);
    }

    if (getItemsResponse['ItemsResult'] !== undefined) {
        return JSON.stringify(getItemsResponse, null, 1);
    }
};

const getVariationsOnSuccess = data => {
    console.log('API called successfully.');
    var getVariationsResponse = ProductAdvertisingAPIv1.GetVariationsResponse.constructFromObject(
        data
    );

    // console.log(
    //     'Complete Response: \n' + JSON.stringify(getVariationsResponse, null, 1)
    // );

    if (getVariationsResponse['Errors'] !== undefined) {
        return JSON.stringify(getVariationsResponse['Errors'], null, 1);
    }

    if (getVariationsResponse['VariationsResult'] !== undefined) {
        return JSON.stringify(getVariationsResponse, null, 1);
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
        getItemResources = [
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
        getVariationsResources = [
            'BrowseNodeInfo.BrowseNodes',
            'BrowseNodeInfo.BrowseNodes.Ancestor',
            'BrowseNodeInfo.BrowseNodes.SalesRank',
            'BrowseNodeInfo.WebsiteSalesRank',
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
            'ItemInfo.ExternalIds',
            'ItemInfo.Features',
            'ItemInfo.ManufactureInfo',
            'ItemInfo.ProductInfo',
            'ItemInfo.TechnicalInfo',
            'ItemInfo.Title',
            'ItemInfo.TradeInInfo',
            'Offers.Listings.Availability.MaxOrderQuantity',
            'Offers.Listings.Availability.Message',
            'Offers.Listings.Availability.MinOrderQuantity',
            'Offers.Listings.Availability.Type',
            'Offers.Listings.Condition',
            'Offers.Listings.Condition.SubCondition',
            'Offers.Listings.DeliveryInfo.IsAmazonFulfilled',
            'Offers.Listings.DeliveryInfo.IsFreeShippingEligible',
            'Offers.Listings.DeliveryInfo.IsPrimeEligible',
            'Offers.Listings.IsBuyBoxWinner',
            'Offers.Listings.LoyaltyPoints.Points',
            'Offers.Listings.MerchantInfo',
            'Offers.Listings.Price',
            'Offers.Listings.ProgramEligibility.IsPrimeExclusive',
            'Offers.Listings.ProgramEligibility.IsPrimePantry',
            'Offers.Listings.Promotions',
            'Offers.Listings.SavingBasis',
            'Offers.Summaries.HighestPrice',
            'Offers.Summaries.LowestPrice',
            'Offers.Summaries.OfferCount',
            'ParentASIN',
            'VariationSummary.Price.HighestPrice',
            'VariationSummary.Price.LowestPrice',
            'VariationSummary.VariationDimension',
        ],
    }) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.host = countries[country].host;
        this.region = countries[country].region;
        this.partnerTag = partnerTag;
        this.partnerType = partnerType;
        this.getItemResources = getItemResources;
        this.getVariationsResources = getVariationsResources;
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
            Resources: this.getItemResources,
        };

        return this.api.getItems(getItemsRequest).then(function (data) {
            return getItemsOnSuccess(data);
        });
    };

    getVariations = async ({ asin }) => {
        if (!this.api) {
            console.error('ProductApi.init() missing...');
            return;
        }
        if (!asin) {
            console.error('ASIN is required!');
            return;
        }

        let getVariationsRequest = new ProductAdvertisingAPIv1.GetVariationsRequest();

        getVariationsRequest = {
            PartnerTag: this.partnerTag,
            PartnerType: this.partnerType,
            ASIN: asin,
            Condition: 'New',
            Resources: this.getVariationsResources,
        };

        return this.api
            .getVariations(getVariationsRequest)
            .then(function (data) {
                return getVariationsOnSuccess(data);
            })
            .catch(err => {
                return err.message;
            });
    };
}

const ProductAPI = config => {
    const ProductAPIWrapper = new AmazonProductAPI(config);

    ProductAPIWrapper.init();

    return ProductAPIWrapper;
};

export default ProductAPI;
