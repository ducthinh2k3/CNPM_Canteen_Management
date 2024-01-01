document.addEventListener('DOMContentLoaded', async function () {
    const couponInput = document.getElementById('couponCode');
    const applyButton = document.getElementById('applyCouponButton');
    const totalAmountElement = document.getElementById('totalAmount');
    const discountAmountElement = document.getElementById('discountAmount');


    const totalValue = localStorage.getItem('NumericSubTotal');
    document.getElementById('subTotalAmount').textContent = `${totalValue}đ`;

    totalAmountElement.innerText = `${totalValue}đ`;

    // xử lý mã khuyến mãi...
    applyButton.addEventListener('click', async function () {
      const couponCode = couponInput.value;
      const response = await fetch(`http://localhost:3000/api/admin/apply-coupon?code=${couponCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ totalAmount: parseFloat(totalAmountElement.innerText) }),
      });

      const result = await response.json();

      if (result.success) {
        discountAmountElement.innerText = totalValue * result.discountAmount;
        totalAmountElement.innerText = totalValue - (totalValue * result.discountAmount);
      } else {
        alert('Invalid coupon code');
      }
    });
    localStorage.setItem("CouponCode", couponInput);
    localStorage.setItem("Total", totalAmountElement.value);
});
