import React, { useState } from "react";
import axios from "axios";

export default function PayUMembership({ user, className = "", style = {} }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const apiUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
                     (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) ||
                     "https://jothi-matrimony.onrender.com";

      const memberUserId = user?.id || user?.regNo || "JM" + Date.now();
      const memberName = user?.full_name || user?.fullName || user?.name || "Valued Member";
      const memberEmail = user?.email || "member@chennaijothimatrimony.com";
      const memberPhone = user?.mobile || user?.phone || "9043773977";

      const response = await axios.post(
        `${apiUrl}/api/payment/create`,
        {
          userId: memberUserId,
          firstname: memberName,
          email: memberEmail,
          phone: memberPhone,
        }
      );

      const { paymentUrl, paymentData } = response.data;

      if (!paymentUrl || !paymentData) {
        throw new Error("Invalid response received from payment server");
      }

      // Create form dynamically to submit to PayU Hosted Checkout
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentUrl;

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("[PayU Payment Error]:", error);
      alert(error.response?.data?.message || "Unable to start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={isLoading}
      className={className || "btn btn-primary btn-full btn-lg"}
      style={{
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.7 : 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "0.85rem 1.5rem",
        fontSize: "1rem",
        fontWeight: 700,
        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        color: "#FFFFFF",
        borderRadius: "8px",
        border: "none",
        boxShadow: "0 4px 12px rgba(5, 150, 105, 0.35)",
        transition: "all 0.2s ease",
        ...style
      }}
    >
      <span>{isLoading ? "Connecting to PayU..." : "Pay ₹1,000 Membership Fee via PayU"}</span>
    </button>
  );
}
