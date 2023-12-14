package models

type SoftwareProduct struct {
	ID            int     `json:"id"`
	Name          string  `json:"name"`
	Description   string  `json:"description,omitempty"`
	PriceMonthly  float64 `json:"priceMonthly"`
	PriceAnnually float64 `json:"priceAnnually"`
}
