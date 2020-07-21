"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _apiClient = _interopRequireDefault(require("./api-client"));

var countries = {
  Australia: {
    host: 'webservices.amazon.com.au',
    region: 'us-west-2'
  },
  Brazil: {
    host: 'webservices.amazon.com.br',
    region: 'us-east-1'
  },
  Canada: {
    host: 'webservices.amazon.ca',
    region: 'us-east-1'
  },
  France: {
    host: 'webservices.amazon.fr',
    region: 'eu-west-1'
  },
  Germany: {
    host: 'webservices.amazon.de',
    region: 'eu-west-1'
  },
  India: {
    host: 'webservices.amazon.in',
    region: 'eu-west-1'
  },
  Italy: {
    host: 'webservices.amazon.it',
    region: 'eu-west-1'
  },
  Japan: {
    host: 'webservices.amazon.co.jp',
    region: 'us-west-2'
  },
  Mexico: {
    host: 'webservices.amazon.com.mx',
    region: 'us-east-1'
  },
  Netherlands: {
    host: 'webservices.amazon.nl',
    region: 'eu-west-1'
  },
  Singapore: {
    host: 'webservices.amazon.sg',
    region: 'us-west-2'
  },
  'Saudi Arabia': {
    host: 'webservices.amazon.sa',
    region: 'eu-west-1'
  },
  Spain: {
    host: 'webservices.amazon.es',
    region: 'eu-west-1'
  },
  Turkey: {
    host: 'webservices.amazon.com.tr',
    region: 'eu-west-1'
  },
  'United Arab Emirates': {
    host: 'webservices.amazon.ae',
    region: 'eu-west-1'
  },
  'United Kingdom': {
    host: 'webservices.amazon.co.uk',
    region: 'eu-west-1'
  },
  'United States': {
    host: 'webservices.amazon.com',
    region: 'us-east-1'
  }
};

var parseResponse = function parseResponse(itemsResponseList) {
  var mappedResponse = {};

  for (var i in itemsResponseList) {
    if (itemsResponseList.hasOwnProperty(i)) {
      mappedResponse[itemsResponseList[i]['ASIN']] = itemsResponseList[i];
    }
  }

  return mappedResponse;
};

var onSuccess = function onSuccess(data) {
  console.log('API called successfully.');

  var getItemsResponse = _apiClient["default"].GetItemsResponse.constructFromObject(data);

  console.log('Complete Response: \n' + JSON.stringify(getItemsResponse, null, 1));

  if (getItemsResponse['Errors'] !== undefined) {
    return JSON.stringify(getItemsResponse['Errors'], null, 1);
  }

  if (getItemsResponse['ItemsResult'] !== undefined) {
    return JSON.stringify(getItemsResponse, null, 1); //     console.log('Printing All Item Information in ItemsResult:');
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

var onError = function onError(error) {
  console.log('Error calling PA-API 5.0!');
  console.log('Printing Full Error Object:\n' + JSON.stringify(error, null, 1));
  console.log('Status Code: ' + error['status']);

  if (error['response'] !== undefined && error['response']['text'] !== undefined) {
    console.log('Error Object: ' + JSON.stringify(error['response']['text'], null, 1));
  }
};

var AmazonProductAPI = function AmazonProductAPI(_ref) {
  var _this = this;

  var accessKey = _ref.accessKey,
      secretKey = _ref.secretKey,
      _ref$country = _ref.country,
      country = _ref$country === void 0 ? 'Italy' : _ref$country,
      _ref$partnerTag = _ref.partnerTag,
      partnerTag = _ref$partnerTag === void 0 ? 'chebazza0c-21' : _ref$partnerTag,
      _ref$partnerType = _ref.partnerType,
      partnerType = _ref$partnerType === void 0 ? 'Associates' : _ref$partnerType,
      _ref$resources = _ref.resources,
      resources = _ref$resources === void 0 ? ['BrowseNodeInfo.BrowseNodes', 'BrowseNodeInfo.BrowseNodes.Ancestor', // 'BrowseNodeInfo.BrowseNodes.SalesRank',
  // 'BrowseNodeInfo.WebsiteSalesRank',
  'Images.Primary.Small', 'Images.Primary.Medium', 'Images.Primary.Large', 'Images.Variants.Small', 'Images.Variants.Medium', 'Images.Variants.Large', 'ItemInfo.ByLineInfo', 'ItemInfo.Classifications', 'ItemInfo.ContentInfo', 'ItemInfo.ContentRating', 'ItemInfo.Features', 'ItemInfo.ProductInfo', 'ItemInfo.TechnicalInfo', 'ItemInfo.Title', 'ItemInfo.TradeInInfo', 'Offers.Listings.Availability.MaxOrderQuantity', 'Offers.Listings.Availability.Message', 'Offers.Listings.DeliveryInfo.IsAmazonFulfilled', 'Offers.Listings.DeliveryInfo.IsFreeShippingEligible', 'Offers.Listings.DeliveryInfo.IsPrimeEligible', 'Offers.Listings.IsBuyBoxWinner', 'Offers.Listings.LoyaltyPoints.Points', 'Offers.Listings.MerchantInfo', 'Offers.Listings.Price', 'Offers.Listings.ProgramEligibility.IsPrimeExclusive', 'Offers.Listings.Promotions', 'Offers.Listings.SavingBasis' // 'Offers.Summaries.HighestPrice',
  // 'Offers.Summaries.LowestPrice',
  // 'Offers.Summaries.OfferCount',
  ] : _ref$resources;
  (0, _classCallCheck2["default"])(this, AmazonProductAPI);
  (0, _defineProperty2["default"])(this, "init", function () {
    var defaultClient = _apiClient["default"].ApiClient.instance;
    defaultClient.accessKey = _this.accessKey;
    defaultClient.secretKey = _this.secretKey;
    defaultClient.host = _this.host;
    defaultClient.region = _this.region;
    _this.api = new _apiClient["default"].DefaultApi(defaultClient);
  });
  (0, _defineProperty2["default"])(this, "getItems", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
      var itemIds, _ref2$condition, condition, getItemsRequest;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              itemIds = _ref2.itemIds, _ref2$condition = _ref2.condition, condition = _ref2$condition === void 0 ? 'New' : _ref2$condition;

              if (_this.api) {
                _context.next = 4;
                break;
              }

              console.error('ProductApi.init() missing...');
              return _context.abrupt("return");

            case 4:
              if (itemIds) {
                _context.next = 7;
                break;
              }

              console.error('itemIds are required!');
              return _context.abrupt("return");

            case 7:
              getItemsRequest = new _apiClient["default"].GetItemsRequest();
              getItemsRequest = {
                PartnerTag: _this.partnerTag,
                PartnerType: _this.partnerType,
                ItemIds: itemIds,
                Condition: condition,
                Resources: _this.resources
              };
              return _context.abrupt("return", _this.api.getItems(getItemsRequest).then(function (data) {
                return onSuccess(data);
              }));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
  this.accessKey = accessKey;
  this.secretKey = secretKey;
  this.host = countries[country].host;
  this.region = countries[country].region;
  this.partnerTag = partnerTag;
  this.partnerType = partnerType;
  this.resources = resources;
  this.api = null;
};

var ProductAPI = function ProductAPI(config) {
  var ProductAPIWrapper = new AmazonProductAPI(config);
  ProductAPIWrapper.init();
  return ProductAPIWrapper;
};

var _default = ProductAPI;
exports["default"] = _default;