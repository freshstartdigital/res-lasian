package models

type Organisation struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Address      string `json:"address,omitempty"`
	ContactEmail string `json:"contactEmail,omitempty"`
}
