export const ShopPageLocators = {
  home: {
    productCard: 'a.card',
    addToCartButton: '[data-test="add-to-cart"]',
    cartLink: '//a[@aria-label="cart"]',
  },
  checkout: {
    step1: '[data-test="proceed-1"]',
    step2Guest: '[data-test="proceed-2-guest"]',
    step3: '[data-test="proceed-3"]',
    guestEmail: '[data-test="guest-email"]',
    guestFirstName: '#guest-first-name',
    guestLastName: '#guest-last-name',
    guestSubmit: '#guest-tab > form > div.input-group.mb-3 > input',
    street: '[data-test="street"]',
    city: '[data-test="city"]',
    state: '[data-test="state"]',
    country: '[data-test="country"]',
    housenumber: '[data-test="house_number"]',
    postalCode: '[data-test="postal_code"]',
  },
  payment: {
    method: '#payment-method',
    cardNumber: '[data-test="credit_card_number"]',
    expiry: '[data-test="expiration_date"]',
    cvv: '[data-test="cvv"]',
    holderName: '[data-test="card_holder_name"]',
    finish: '[data-test="finish"]',
    successMessage: '[data-test="payment-success-message"]',
  }
};
