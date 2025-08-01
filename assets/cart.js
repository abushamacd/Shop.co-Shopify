jQuery(document).ready(function ($) {
  let addToCartForm = document.querySelector('form[action$="/cart/add"]');

  $(addToCartForm).on("submit", function (e) {
    e.preventDefault();
    $(this)
      .find("button[type='submit']")
      .empty().append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mx-auto animate-spin h-[24px] w-[10px]">
        <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
      </svg>`);

    let formData = {
      items: [
        {
          id: $("#varient_id").val(),
          quantity: parseInt($("input[name='quantity']").val() || 1),
        },
      ],
    };

    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
      success: function (response) {
        console.log("Item added to cart:", response);
        // Optionally, you can update the cart UI or show a success message here
        $(addToCartForm).find("button[type='submit']").text("Added to Cart");
      },
      error: function (error) {
        console.error("Error adding item to cart:", error);
        // Optionally, you can show an error message to the user here
        $(addToCartForm).find("button[type='submit']").text("Add to Cart");
      },
    });
  });
});
