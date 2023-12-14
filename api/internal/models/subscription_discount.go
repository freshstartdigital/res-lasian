package models

type SubscriptionDiscount struct {
	SubscriptionID int `json:"subscriptionId"`
	DiscountCodeID int `json:"discountCodeId"`
}
