module.exports = {
  baseurl: 'https://otce.finra.org',

  equityShortInterest: () => {
    return {
      url: `${module.exports.baseurl}/otce/EquityShortInterest/archives`,
      apiReqUrl: 'https://api.finra.org/data/group/otcMarket/name/equityShortInterestStandardized'
    };
  }
};
