package models

import "time"

type DiscountCode struct {
	ID                 int       `json:"id"`
	Code               string    `json:"code"`
	DiscountPercentage int       `json:"discountPercentage"`
	ValidFrom          time.Time `json:"validFrom"`
	ValidUntil         time.Time `json:"validUntil"`
}
