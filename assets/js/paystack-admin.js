jQuery(function ($) {
  "use strict";

  /**
   * Object to handle Paystack admin functions.
   */
  var wc_paystack_admin = {
    /**
     * Initialize.
     */
    init: function () {
      // Toggle api key settings.
      $(document.body).on(
        "change",
        "#woocommerce_paystack_testmode",
        function () {
          var test_secret_key = $("#woocommerce_paystack_test_secret_key")
              .parents("tr")
              .eq(0),
            test_secret_ghana_key = $(
              "#woocommerce_paystack_test_secret_ghana_key"
            )
              .parents("tr")
              .eq(0),
            test_public_ghana_key = $(
              "#woocommerce_paystack_test_public_ghana_key"
            )
              .parents("tr")
              .eq(0),
            test_secret_southafrica_key = $(
              "#woocommerce_paystack_test_secret_southafrica_key"
            )
              .parents("tr")
              .eq(0),
            test_public_southafrica_key = $(
              "#woocommerce_paystack_test_public_southafrica_key"
            )
              .parents("tr")
              .eq(0),
            live_secret_key = $("#woocommerce_paystack_live_secret_key")
              .parents("tr")
              .eq(0),
            live_public_key = $("#woocommerce_paystack_live_public_key")
              .parents("tr")
              .eq(0);
          (test_public_key = $("#woocommerce_paystack_test_public_key")
            .parents("tr")
            .eq(0)),
            (live_secret_ghana_key = $(
              "#woocommerce_paystack_live_secret_ghana_key"
            )
              .parents("tr")
              .eq(0)),
            (live_public_ghana_key = $(
              "#woocommerce_paystack_live_public_ghana_key"
            )
              .parents("tr")
              .eq(0)),
            (live_secret_southafrica_key = $(
              "#woocommerce_paystack_live_secret_southafrica_key"
            )
              .parents("tr")
              .eq(0)),
            (live_public_southafrica_key = $(
              "#woocommerce_paystack_live_public_southafrica_key"
            )
              .parents("tr")
              .eq(0));

          if ($(this).is(":checked")) {
            test_secret_key.show();
            test_public_key.show();
            test_secret_ghana_key.show();
            test_public_ghana_key.show();
            test_secret_southafrica_key.show();
            test_public_southafrica_key.show();
            live_secret_key.hide();
            live_public_key.hide();
            live_secret_ghana_key.hide();
            live_public_ghana_key.hide();
            live_secret_southafrica_key.hide();
            live_public_southafrica_key.hide();
          } else {
            test_secret_key.hide();
            test_public_key.hide();
            test_secret_ghana_key.hide();
            test_public_ghana_key.hide();
            test_secret_southafrica_key.hide();
            test_public_southafrica_key.hide();
            live_secret_key.show();
            live_public_key.show();
            live_secret_ghana_key.show();
            live_public_ghana_key.show();
            live_secret_southafrica_key.show();
            live_public_southafrica_key.show();
          }
        }
      );

      $("#woocommerce_paystack_testmode").change();

      $(document.body).on(
        "change",
        ".woocommerce_paystack_split_payment",
        function () {
          var subaccount_code = $(".woocommerce_paystack_subaccount_code")
              .parents("tr")
              .eq(0),
            subaccount_charge = $(
              ".woocommerce_paystack_split_payment_charge_account"
            )
              .parents("tr")
              .eq(0),
            transaction_charge = $(
              ".woocommerce_paystack_split_payment_transaction_charge"
            )
              .parents("tr")
              .eq(0);

          if ($(this).is(":checked")) {
            subaccount_code.show();
            subaccount_charge.show();
            transaction_charge.show();
          } else {
            subaccount_code.hide();
            subaccount_charge.hide();
            transaction_charge.hide();
          }
        }
      );

      $("#woocommerce_paystack_split_payment").change();

      // Toggle Custom Metadata settings.
      $(".wc-paystack-metadata")
        .change(function () {
          if ($(this).is(":checked")) {
            $(
              ".wc-paystack-meta-order-id, .wc-paystack-meta-name, .wc-paystack-meta-email, .wc-paystack-meta-phone, .wc-paystack-meta-billing-address, .wc-paystack-meta-shipping-address, .wc-paystack-meta-products"
            )
              .closest("tr")
              .show();
          } else {
            $(
              ".wc-paystack-meta-order-id, .wc-paystack-meta-name, .wc-paystack-meta-email, .wc-paystack-meta-phone, .wc-paystack-meta-billing-address, .wc-paystack-meta-shipping-address, .wc-paystack-meta-products"
            )
              .closest("tr")
              .hide();
          }
        })
        .change();

      // Toggle Bank filters settings.
      $(".wc-paystack-payment-channels")
        .on("change", function () {
          var channels = $(".wc-paystack-payment-channels").val();

          if ($.inArray("card", channels) != "-1") {
            $(".wc-paystack-cards-allowed").closest("tr").show();
            $(".wc-paystack-banks-allowed").closest("tr").show();
          } else {
            $(".wc-paystack-cards-allowed").closest("tr").hide();
            $(".wc-paystack-banks-allowed").closest("tr").hide();
          }
        })
        .change();

      $(".wc-paystack-payment-icons").select2({
        templateResult: formatPaystackPaymentIcons,
        templateSelection: formatPaystackPaymentIconDisplay
      });
    }
  };

  function formatPaystackPaymentIcons(payment_method) {
    if (!payment_method.id) {
      return payment_method.text;
    }

    var $payment_method = $(
      '<span><img src=" ' +
        wc_paystack_admin_params.plugin_url +
        "/assets/images/" +
        payment_method.element.value.toLowerCase() +
        '.png" class="img-flag" style="height: 15px; weight:18px;" /> ' +
        payment_method.text +
        "</span>"
    );

    return $payment_method;
  }

  function formatPaystackPaymentIconDisplay(payment_method) {
    return payment_method.text;
  }

  wc_paystack_admin.init();
});
