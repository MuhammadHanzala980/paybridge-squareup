"use client"

import { updateOrderStatus } from "@/lib/woocommerce"
import { useEffect } from "react"
 
export default function SuccessPage( ) {
  useEffect(() => {
    const updateOrder = async () => {
      try {
        const orderId = await localStorage.getItem("orderId")
        console.log(orderId, "order id")
        if (orderId) {
         const updatedOrder = await updateOrderStatus(orderId, "processing")
        console.log(updatedOrder)
         localStorage.removeItem("orderId")
        }
      } catch (error) {
        console.error("Error updating order status:", error)
      }
    }

    updateOrder()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl">Thank you for your purchase.</p>
      <a href="/" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Return to Home
      </a>
    </div>
  )
}

