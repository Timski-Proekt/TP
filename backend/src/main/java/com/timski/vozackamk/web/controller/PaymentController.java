package com.timski.vozackamk.web.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class PaymentController {

    public PaymentController() {
        Stripe.apiKey = "sk_test_51PkmjO1UiNUnWFHXHcUCwxYn9j9VA4NTfT4ZBZa0fhT7n2pXieiSUrNvVPuRGAqBfe4SMVgzTWnK1ByO6A8UBp4z00LS2WMMCx";
    }

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession() throws StripeException {
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000/success")
                        .setCancelUrl("http://localhost:3000/appointment")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("usd")
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName("Payment")
                                                                        .build())
                                                        .setUnitAmount(5000L)
                                                        .build())
                                        .setQuantity(1L)
                                        .build())
                        .build();

        Session session = Session.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("id", session.getId());

        return responseData;
    }
}
