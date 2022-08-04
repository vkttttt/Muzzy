var express = require("express");
const bodyParser = require("body-parser");

var adminModel = require("../admin/models");

var ezbookingModel = require("../ezbooking/models");

var payments = express();
const paypal = require("paypal-rest-sdk");
const { any } = require("joi");

payments.set("views", _basepath + "app/views");

var mod_config = {
  module: "ezbooking",
  resource: "payment",
  collection: "ezbookingPayments",
  route: "payment",
  view: "payment",
  alias: "payment",
};
payments.get("/", async function (req, res) {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  // res.render("frontend/payment", dataView);
  res.json(dataView);
});

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AckNNYYAgsA59P_nom5JBUpF9ZgtFw4ycme58fHu050ZiqoJlvea4gfbXm_0QdK_HOm5XM0wf91fHaqD",
  client_secret:
    "ENLOBxzWn5giV4ueeTyGXBFLb9_pwJV7Wu_1lVRj1m8JlOJyRO473B65Yvmjpo6wTZwYBl_169lOYz67",
});

payments.post("/paypal", async function (req, res) {
  const { price, name, order_id, branch_id } = req.body;
  var price_usd = parseFloat(price) / 20300;
  price_usd = price_usd.toFixed(2);
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/ezbooking/payment/success",
      cancel_url: "http://localhost:3000/ezbooking/payment/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: `${name}`,
              sku: `${order_id}`,
              price: price_usd.toString(),
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: price_usd.toString(),
        },
        description: "Thanh toán cho nhà hàng",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

payments.get("/cancle", function (req, res) {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  res.render("frontend/cancle", dataView);
});

payments.get("/success", async (req, res) => {
  var dataView = helpers.ezbooking.get_data_view_ezbooking(req, mod_config);
  var userdata = req.session.userdata;
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  paypal.payment.get(paymentId, async (error, payment) => {
    if (error) {
      throw error;
    } else {
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: payment.transactions[0].amount.currency,
              total: payment.transactions[0].amount.total,
            },
          },
        ],
      };
      var dataPay = {
        amount: payment.transactions[0].amount.total,
        orderId: payment.transactions[0].item_list.items[0].sku,
        payment_type: "Paypal",
        branch_name: payment.transactions[0].item_list.items[0].name,
        user_id: userdata.user_id,
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        async function (error, payment) {
          if (error) {
            res.render("frontend/cancle", dataView);
          } else {
            // ghi vao db
            if (dataPay) {
              await ezbookingModel.create("ezbookingPayments", dataPay);
              await ezbookingModel.update(
                "ezbookingOrders",
                { _id: dataPay.orderId },
                { is_paid: true , status: 1}
              );
            }
            res.render("frontend/success", dataView);
          }
        }
      );
    }
  });
});

module.exports = payments;
