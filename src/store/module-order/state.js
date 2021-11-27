export default function () {
  return {
    orders: {
      Details: [
        {
          ID: "",
          GoodID: "",
          AppID: "",
          UserID: "",
          Units: 0,
          Discount: 0,
          SpecialReductionAmount: 0,
          GoodPaying: {
            ID: "",
            OrderID: "",
            PaymentID: "",
          },
          GasPayings: [
            {
              ID: "",
              OrderID: "",
              PaymentID: "",
              DurationMinutes: 0,
            },
          ],
          Compensates: [
            {
              ID: "",
              OrderID: "",
              Start: 0,
              End: 0,
              Message: "",
            },
          ],
          OutOfGases: [
            {
              ID: "",
              OrderID: "",
              Start: 0,
              End: 0,
            },
          ],
          Payment: {
            ID: "",
            OrderID: "",
            Account: {
              ID: "",
              CoinTypeID: "",
              Address: "",
              AppID: "",
              UserID: "",
            },
            Amount: 0,
            CoinInfo: {
              ID: "",
              PreSale: true,
              Name: "",
              Unit: "",
              Logo: "",
            },
            State: "",
            ChainTransactionID: "",
            PlatformTransactionID: "",
          },
          Start: 0,
          End: 0,
          Coupon: {
            ID: "",
            UserID: "",
            AppID: "",
            Used: true,
            Pool: {
              ID: "",
              AppID: "",
              Denomination: 0,
              Start: 0,
              DurationDays: 0,
              Message: "",
              Name: "",
            },
          },
        },
      ],
    },
  };
}
