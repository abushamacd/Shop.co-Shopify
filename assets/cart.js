jQuery(document).ready(function ($) {
  function cartItem(items) {
    $(".cart_items").empty();
    $.each(items, function (index, item) {
      $(".cart_items").append(`
          <div action="{{routes.cart_url}}" method="post">
                <div class="">
                  <div class="flex justify-between p-5 border-b border-gray-100 px-6">
                    <div class="flex justify-between">
                      <img
                        style="height: 144px; width: 144px;"
                        class="rounded-xl"
                        height="144"
                        width="144"
                        src="${item.image}"
                        alt=""
                      >
                      <div class=" my-auto  items-center p-2">
                        <p class="font-bold">${item.product_title}</p>
                        <p class="py-1 text-sm font-medium">Varient: <span class="font-thin text-gray-400">${item.variant_title}</span></p>
                        <p class="text-sm font-medium">Quantity: <span class="font-thin text-gray-400">${item.quantity}</span></p>
                        <p class="font-bold mt-6 text-4xl">${item.final_price}</p>
                      </div>
                    </div>

                    <div class="flex flex-col justify-between py-2 items-end right-0">
                      <button data-item-id=${item.id} class="remove_from_cart">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z" fill="#FF3333"></path>
                          </svg>
                      </button>
                      <div class="flex px-5 border border-gray-200 rounded-full bg-[#F0F0F0]">
                     

                      </div>
                    </div>
                  </div>
                </div>
              </div>`);
    });
  }

  $.ajax({
    type: "GET",
    url: "/cart.js",
    dataType: "json",
    success: function (response) {
      cartItem(response.items);
    },
  });

  // remove_from_cart
  $(document).on("click", ".remove_from_cart", function (e) {
    e.preventDefault();
    var itemId = $(this).data("item-id");

    let updates = {
      [itemId]: 0,
    };

    $.ajax({
      type: "POST",
      url: "/cart/update.js",
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      data: JSON.stringify({ updates }),
      success: function (response) {
        cartItem(response.items);

        if (response.item_count === 0) {
          $(".cart_UI")
            .html(`<div class=" flex flex-col justify-center items-center gap-2">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#D1D5DB" stroke-width="10"/>
                <path d="M30 50L45 65L70 35" stroke="#4B5563" stroke-width="10" stroke-linecap="round"/>
              </svg>
              <div class="text-gray-500 text-lg inline-block">Your cart is empty</div>
            </div>`);
        }
      },
      error: function (error) {
        console.error("Error removing item from cart:", error);
      },
    });
  });
});
